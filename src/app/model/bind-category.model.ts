export class ResBindCategoryModel {    
    MCategoryId: number;
    CategoryName: string; 
    CategoryClass: string;
    isChecked: boolean;
    constructor() { 
        this.MCategoryId = 0;
        this.CategoryName = "";
        this.CategoryClass = "";
        this.isChecked = false;
    }
}