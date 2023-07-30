const display = document.querySelector(`#display`);
const btnGenerateCpf = document.querySelector(`.btn-generate`);
const btnValidateCpf = document.querySelector(`.btn-validate`);
const outPut = document.querySelector(`.output-result`);

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

        const formattedCPF = (cpfArray, digiti1, digiti2) => {
            return `${cpfArray[0]}${cpfArray[1]}${cpfArray[2]}.${cpfArray[3]}${cpfArray[4]}${cpfArray[5]}.${cpfArray[6]}${cpfArray[7]}${cpfArray[8]}-${digiti1}${digiti2}`;
        }


        return formattedCPF(cpfArray, checkDigit1, checkDigit2);
    }

    return constructorCpf();
}

const validateCpf = (cpfLiteral) => {

    const convertCpfToArray = cpfString => {
        let cpfToArray = cpfString.replace(/\D/g, "").split("").map(Number);
        return cpfToArray;
    };
    const cpfArray = convertCpfToArray(cpfLiteral);

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

    const verifyCpf = () => {
        if (cpfArray.length === 11 && firstDigit && secondDigit) return true;
        return false;
    }

    const validateOrNot = verifyCpf();

    const setResult = () => {
        const p = document.createElement("p");
        if (validateOrNot) {
            outPut.classList.add("true");
            outPut.classList.remove("false");
            p.innerText = `CPF válido`;
        } else {
            outPut.classList.add("false");
            outPut.classList.remove("true");
            p.innerText = `CPF inválido`;
        }
        outPut.innerHTML = ``;
        outPut.appendChild(p);
    }

    return setResult(convertCpfToArray(cpfLiteral));

};


