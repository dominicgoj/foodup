export default filterHexId = (notificationList, targetList, type) =>  {
    const hexIdentifiers = notificationList.map(obj => obj.hex_identifier);

    const filteredTargetList = targetList.filter(obj => hexIdentifiers.includes(obj.hex_identifier));
    if(type){
      const updatedFilteredTargetList = filteredTargetList.map(obj => ({
        ...obj,
        type: type // Replace 'your_type_value' with the desired value for the 'type' field
      }));
      return updatedFilteredTargetList;
    }else{
      return filteredTargetList
    }
    
    
  }