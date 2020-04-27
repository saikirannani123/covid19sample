export const isValidEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !reg.test(text);
};

export const isEmpty = text => {
    return (text === undefined || text.length === 0);
};

export const isValidPassword = text => {
    let reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return !reg.test(text);
};

 export const isValidName = text => {
     let reg =  /^[a-zA-Z]+$/;
     return !reg.test(text);
 };
 
export const isName = text => {
    let reg =  /^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/;
    return !reg.test(text);
};