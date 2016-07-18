/**
 * Created by omalik on 7/17/2016.
 */
// Function will start counting from 100 and will decrement to 0
var bottles = 99,
    BottleText="bottles",
    text="";
window.onload=function() { 
    var output = document.getElementById('output'); //Song will be stored in div with "output" id
    while (bottles > 0) {
        // write before decrementing
        if (bottles==1) BottleText="bottle"; // This is how we handle plural bottles
        text = "<li>"+bottles+" "+BottleText+" of beer on the wall, "+bottles+" "+BottleText+" of beer.</li>";
        bottles--;
        if (bottles==0) bottles="no more"; // This is how we handle 0 bottles 
        text += "<li>Take one down and pass it around, "+bottles+" bottles of beer on the wall.</li>"
        output.innerHTML += text; // we insert this into our html file - index.html
    }
    output.innerHTML += "<li>No more bottles of beer on the wall, no more bottles of beer.</li><li>Go to the store and buy some more, 99 bottles of beer on the wall.</li>"
}
