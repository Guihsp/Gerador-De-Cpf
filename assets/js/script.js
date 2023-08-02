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
    const cpfArray = generateCpfNumbers();

    const constructorCpf = () => {
        const calculateCheckDigit1 = () => {
            let sum = 0, rest = 0, checkDigit;

            for (let i = 0; i < 9; i++) sum += cpfArray[i] * (10 - i);

            rest = sum % 11;

            checkDigit = rest < 2 ? 0 : 11 - rest;
            return checkDigit;
        }
        const firstCheckDigit = calculateCheckDigit1();

        const calculateCheckDigit2 = () => {
            let sum = 0, rest = 0, checkDigit;

            for (let i = 0; i < 9; i++) sum += cpfArray[i] * (11 - i);

            sum += (firstCheckDigit * 2);
            rest = sum % 11;

            checkDigit = rest < 2 ? 0 : 11 - rest;
            return checkDigit;
        }
        const secondCheckDigit = calculateCheckDigit2();

        const formattedCPF = () => {
            return `${cpfArray.slice(0, 3).join('')}.${cpfArray.slice(3, 6).join('')}.${cpfArray.slice(6, 9).join('')}-${firstCheckDigit}${secondCheckDigit}`;
        }

        return formattedCPF();
    }

    return constructorCpf();
}

const validateCpf = (cpfLiteral) => {
    const convertCpfToArray = () => {
        return cpfLiteral.split('.').join('').split('-').join('').split('').map(Number);
    };
    const cpfArray = convertCpfToArray();

    const checkArrayLength = () => {
        return cpfArray.length === 11;
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
        return arrayLength && firstDigit && secondDigit;
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