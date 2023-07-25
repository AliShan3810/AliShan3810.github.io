function onDownloadResumeHandler(value){
  if(value==="1")
  {
    window.open("docs/ali-shan-resume.pdf")
  }
  else if(value==="2")
  {
    window.open("docs/ali-shan-cv.pdf")
  }
  document.getElementById("select-download-resume").value=0;
  
}