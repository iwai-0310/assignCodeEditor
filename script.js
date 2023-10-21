function run(){
    let codeLeft=document.getElementById("left-input").value;
    let codeRight=document.getElementById("right-input").value;
    let result=document.getElementById("output");

    let iframeDocument = result.contentDocument;
    if (iframeDocument) {
        let iframeBody = iframeDocument.body;

        // Set the text color to white with higher priority using !important
        iframeBody.style.color = "black";

        // Set the content of the iframe
        iframeBody.innerHTML = codeLeft;
    }
}

function copyData(){
    let datatype= 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    let copyContentLeft= document.getElementById('left-input').value;
    let copyContentRight=document.getElementById('right-input').value;

    if(copyContentLeft || copyContentRight){
        const combinedContent = `${copyContentLeft}\n\n${copyContentRight}`;
        // let tableHtmlLeft=copyContentLeft.outerHTML;
        // let tableHtmlRight=copyContentRight.outerHTML;
        let downloadLink=document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.href='data:' + datatype + ', ' + encodeURIComponent(combinedContent);
        downloadLink.download='downloaded_code.docx';
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    else{
        console.error("content not found")
    }
}