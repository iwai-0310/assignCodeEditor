// Function run that will run on keyup for right and left textarea in the middle
function run(){
    //Get the content in the right and left textarea
    let codeLeft=document.getElementById("left-input").value;
    let codeRight=document.getElementById("right-input").value;
    //Get the iframe element
    let result=document.getElementById("output");
    let iframeDocument = result.contentDocument;
    if (iframeDocument) {
        //Get the iframe body
        let iframeBody = iframeDocument.body;
        // inject the right and left textarea value 
        let completeHTML=`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Code Output</title>
            <style>${codeRight}</style>
        </head>
        <body>
            ${codeLeft}
        </body>
        </html>
    `;
        //Reducted code- iframeBody.innerHTML = codeLeft + "<style>"+codeRight+"</style>";
        // Set the content of the iframe
        iframeBody.innerHTML=completeHTML;
    }
}
// Function to download the content of right and left textarea to a file
function saveData(){
    //Define the data type for the download
    let datatype= 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    //Get the content from the left and right textarea
    let saveContentLeft= document.getElementById('left-input').value;
    let saveContentRight=document.getElementById('right-input').value;
    // check if the content is there in either textarea
    if(saveContentLeft || saveContentRight){
        //Combine the content from both textareas
        const combinedContent = `${saveContentLeft}\n\n${saveContentRight}`;

        // let tableHtmlLeft=saveContentLeft.outerHTML;
        // let tableHtmlRight=saveContentRight.outerHTML;

        // Create the download link element 
        let downloadLink=document.createElement('a');
        document.body.appendChild(downloadLink);
        // Set the link href attribute with content and datatype
        downloadLink.href='data:' + datatype + ', ' + encodeURIComponent(combinedContent);
        // set a deafault name to the download filename
        downloadLink.download='downloaded_code.docx';
        // Trigger a click event
        downloadLink.click();
        // Remove the download link 
        document.body.removeChild(downloadLink);
    }
    // Display error if no content is found in both of them.
    else{
        console.error("content not found")
        console.warn('No Code to download');
        alert('No Content to download ')
    }
}
// Function to copy the content of right and left textareas
function copyData() {
    // Get the content from the left and right textareas
    let copyContentLeft = document.getElementById('left-input').value;
    let copyContentRight = document.getElementById('right-input').value;

    // Get the "Copy" button element
    let copyButton=document.querySelector('.btn--copy');
    

    // Combine the content from both textareas
    const combinedContent = `${copyContentLeft}\n\n${copyContentRight}`;

    // Create a thrid textarea element  which will hold the data form combined content
    const copyTextarea = document.createElement("textarea");
    copyTextarea.value = combinedContent;
    document.body.appendChild(copyTextarea);

    // Select the text in the hidden textarea
    copyTextarea.select();

    try {
        // Execute the copy command 
        document.execCommand('copy');
        //Changing the button appearance and icon
        copyButton.style.border= '2px solid green';
        copyButton.style.color= 'green';
        copyButton.innerText= 'Copied';

        //Reverting the copyButton to default after 3 secs
        setTimeout(()=>{
            copyButton.style.border= '';
            copyButton.style.color= 'black'
            copyButton.innerText= 'Copy';
        }, 3000);
        
    } catch (err) {
        console.error('Unable to copy content: ' + err);
    }

    // Remove the temporary textarea
    document.body.removeChild(copyTextarea);
}