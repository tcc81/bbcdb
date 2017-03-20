'use strict';  
  
module.exports = {  
    el: {  
		addButton : element(by.id('add')), // "Add a new computer" button
		searchBox : element(by.id('searchbox')), // Search input field
		searchButton : element(by.id('searchsubmit')), // Search submit button
		alertmsg : element(by.xpath("//div[1][@class='alert-message warning']")), //Alert message on home page
		h1 : element(by.xpath('//*[@id="main"]/h1')), // page h1
		url : 'http://computer-database.herokuapp.com/computers'
    },  
      
    gohome: function() {  
        browser.get('http://computer-database.herokuapp.com/computers',30000); //Gets the homepage
    },  
      
    search_c: function(computer_name) {  
        var sel = this.el;  
          
        sel.searchBox.sendKeys(computer_name);  
        sel.searchButton.click();  
    }  
};