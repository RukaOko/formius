const Regx = (value, reg) =>
{
    if(reg.expression.test(value))
    {
        return false;
    }
    else
    {
        return reg.error;
    }
}
export default Regx;