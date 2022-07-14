export const GraphData = ({count, digit})=>{
    const array = [];
    for(let index = 0; index < count; index++ )
    {
        const element = Math.round(Math.random()*digit);
        array.push(element);
    }
    return array;
};

export const randomValue = ( { digit})=>{
    const elm = Math.round(Math.random()*digit);
    return elm;
} 


