const display = document.querySelector(`#display`);
const outPut = document.querySelector(`.result-output`);

document.addEventListener("click", event => {
    const element = event.target;
    if (element.classList.contains(`btn-generate`)) {
        display.value = ``;
        if (display.value === ``) {
            display.value += generateCpf();
        }
    }
    if (element.classList.contains("btn-validate")) {
        validateCpf(display.value);
    }
});

const generateCpf = () => {

    const generateCpfNumbers = () => {
        const cpfArray = [];
        for (let i = 0; i < 9; i++) {
            const randomNumber = Math.floor(Math.random() * 10);
            cpfArray.push(randomNumber);
        }
        return cpfArray;
    }

    const constructorCpf = () => {
        const calculateCheckDigit1 = () => {
            let sum = 0, rest = 0, checkDigit1;

            for (let i = 0; i < 9; i++) {
                sum += cpfArray[i] * (10 - i);
            }

            rest = sum % 11;

            if (rest < 2) {
                checkDigit1 = 0;
            } else {
                checkDigit1 = 11 - rest;
            }
            return checkDigit1;
        }

        const calculateCheckDigit2 = () => {
            let sum = 0, rest = 0, checkDigit2;

            for (let i = 0; i < 9; i++) {
                sum += cpfArray[i] * (11 - i);
            }

            const checkDigit1 = calculateCheckDigit1();
            sum += (checkDigit1 * 2);
            rest = sum % 11;

            if (rest < 2) {
                checkDigit2 = 0;
            } else {
                checkDigit2 = 11 - rest;
            }

            return checkDigit2;
        }

        const cpfArray = generateCpfNumbers();
        const checkDigit1 = calculateCheckDigit1();
        const checkDigit2 = calculateCheckDigit2();

        const formattedCPF = () => {
            return `${cpfArray[0]}${cpfArray[1]}${cpfArray[2]}.${cpfArray[3]}${cpfArray[4]}${cpfArray[5]}.${cpfArray[6]}${cpfArray[7]}${cpfArray[8]}-${checkDigit1}${checkDigit2}`;
        }

        return formattedCPF();
    }

    return constructorCpf();
}

const validateCpf = (cpfLiteral) => {
    const convertCpfToArray = () => {
        let cpfToArray = cpfLiteral.split('.').join('').split('-').join('').split('').map(Number);
        return cpfToArray;
    };
    let cpfArray = convertCpfToArray();

    const checkArrayLength = () => {
        if (cpfArray.length !== 11) return false;
        return true
    }
    const arrayLength = checkArrayLength();

    const isValidFirstDigit = () => {
        let factor = 10, mult = 0, rest = 0, sum = 0;
        let firstDigit = cpfArray[9];

        for (let i = 0; i < 9; i++) {
            mult = cpfArray[i] * factor;
            sum += mult;
            factor--;
        }
        rest = (sum * 10) % 11;

        firstDigit = rest === 10 || rest === 11 ? 0 : rest;
        return firstDigit === cpfArray[9];
    }

    const isValidSecondDigit = () => {
        let factor = 11, mult = 0, rest = 0, sum = 0;
        let secondDigit = cpfArray[10];

        for (let i = 0; i < 10; i++) {
            mult = cpfArray[i] * factor;
            sum += mult;
            factor--;
        }
        rest = (sum * 10) % 11;

        secondDigit = rest === 10 || rest === 11 ? 0 : rest;
        return secondDigit === cpfArray[10];
    }
    const firstDigit = isValidFirstDigit();
    const secondDigit = isValidSecondDigit();


    const validOrNotCPf = () => {
        if (arrayLength && firstDigit && secondDigit) return true;
        return false;
    }
    const validOrNot = validOrNotCPf();

    const creatP = () => {
        const p = document.createElement(`p`);
        return p;
    }
    const p = creatP();

    const setResult = () => {
        const msg = [`CPF valido`, `CPF invalido`];
        outPut.classList.toggle("true", validOrNot);
        outPut.classList.toggle("false", !validOrNot);
        p.innerText = `${msg[validOrNot ? 0 : 1]}`;
        p.style.fontWeight = "bold";
        outPut.innerHTML = "";
        outPut.appendChild(p);
    }

    return setResult();
};