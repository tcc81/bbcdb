'use strict';  
  
module.exports = {  
    el: {  
		computer_Field : element(by.id('name')), // "Computer name" input field
		intrDate_Field : element(by.id('introduced')), // "Introduced date" input field
		discDate_Field : element(by.id('discontinued')), // "Discontinued date" input field
		create_Button : element(by.xpath("//input[@type='submit'][@value='Create this computer']")), //"Create this computer" button
		save_Button : element(by.xpath("//input[@type='submit'][@value='Save this computer']")), //"Save this computer" button
		delete_Button : element(by.xpath("//input[@type='submit'][@value='Delete this computer']")), //"Delete this computer" button
		url : 'http://computer-database.herokuapp.com/computers/new'
    },  
     
    set_computer_name: function(computer_name) {  
        var ael = this.el;  
        ael.computer_Field.sendKeys(computer_name);  
	},  
	set_iDate: function(intrDate) {  
        var ael = this.el;  
        ael.intrDate_Field.sendKeys(intrDate);  
	},  
	set_dDate: function(discDate) {  
        var ael = this.el;  
        ael.discDate_Field.sendKeys(discDate);  
	},  
	set_company: function(company) {  
        var ael = this.el;  
        element(by.cssContainingText('option', company)).click();
    }
};