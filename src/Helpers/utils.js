export const checkCellValue=(value)=>{
    if(value?.length==0 || value==null || value==undefined){
        return 0
    }
    return value
}