function dateOnly()
{
    let dt =new Date();

    let date = ("0" + dt.getDate()).slice(-2);
    let month = ("0" + (dt.getMonth()+1)).slice(-2);
    let year = dt.getUTCFullYear();
    var output = date;

    return output;
}
module.exports = {dateOnly}