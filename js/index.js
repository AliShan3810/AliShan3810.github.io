function onDownloadResumeHandler(value){
  if(value==="1")
  {
    window.open("docs/numan-resume.pdf")
  }
  else if(value==="2")
  {
    window.open("docs/numan-cv.pdf")
  }
  document.getElementById("select-download-resume").value=0;
  
}