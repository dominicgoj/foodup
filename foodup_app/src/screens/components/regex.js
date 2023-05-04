export default function Regex(type, input) {
    const phoneRegex = /^\+\d{11,15}$/;// Example: "+431234567890"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    phonetype = "telephone"
    emailtype ="email"
    if(type===phonetype){
        if (!phoneRegex.test(input)) {
            return true
          }
    }
    if(type===emailtype){
        if (!emailRegex.test(input)) {
            return true
          }
    }
    
    
}