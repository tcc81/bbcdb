'use strict';  
  
module.exports = {  
    el: {  

	nor_text : element(by.cssContainingText('.well', 'Nothing to display')), // No results text
	row2 : element(by.xpath("//*[@id='main']/table/tbody/tr[2]")), //2nd line in results list
	cname : element(by.xpath("//*[@id='main']/table/tbody/tr[1]/td[1]/a")), //Computer name is results list
	idate : element(by.xpath("//*[@id='main']/table/tbody/tr[1]/td[2]")), //Introduced date is results list
	ddate : element(by.xpath("//*[@id='main']/table/tbody/tr[1]/td[3]")), //Discontinued date is results list
	company : element(by.xpath("//*[@id='main']/table/tbody/tr[1]/td[4]")), //Company name is results list
		
    },  
      
    getResults: function(computer) {  
        browser.get('http://computer-database.herokuapp.com/computers?f='+computer,30000); //Gets the search result page for a computer name
    }
};