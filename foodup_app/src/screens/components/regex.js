export default function Regex(type, input) {
    const phoneRegex = /^\+\d{11,15}$/;// Example: "+431234567890"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9]+(\.[a-zA-Z]{2,}){1,}$/;
    phonetype = "telephone"
    emailtype ="email"
    const websiteType = "website";

    if(type===phonetype&&input!=""){
        if (!phoneRegex.test(input)) {
            return true
          }
    }
    if(type===emailtype&&input!=""){
        if (!emailRegex.test(input)) {
            return true
          }
          
    }
    if(type===websiteType){
        if (!websiteRegex.test(input)) {
            return true
          }
    }
    
    
}