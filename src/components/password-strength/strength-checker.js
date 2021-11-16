const hasNumber = value => {
    return new RegExp(/[0-9]/).test(value);
}
const hasMixed = value => {
    return new RegExp(/[a-z]/).test(value) &&
        new RegExp(/[A-Z]/).test(value);
}
const hasSpecial = value => {
    return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
}
export const strengthColor = count => {
    if (count <= 25)
        return 'red';
    //if (count < 3)
    //    return 'yellow';
    if (count <= 50)
        return 'yellow';
    if (count <= 75)
        return 'pink';
    if (count <= 100)
        return 'green';
}
export const strengthIndicator = value => {
    let strengths = 0;
    if (value.length > 5)
        strengths = strengths + 25;
    //if (value.length > 7)
    //    strengths = strengths + 10;
    if (hasNumber(value))
        strengths = strengths + 25;
    if (hasSpecial(value))
        strengths = strengths + 25;
    if (hasMixed(value))
        strengths = strengths + 25;
    return strengths;
}