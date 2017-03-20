var homePage = require('./HomePage.js');
var addPage = require('./AddPage.js');
var resPage = require('./ResultsPage.js');

var months = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "Aug",
  "09": "Sept",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec"  
};

//Test data
	var c_name = 'Computer-TCA-100'; 
	var in_date = '2005-12-15'; 
	var in_dateStr = in_date.split(/[-]/);
	var dis_date = '2010-11-01'; 
	var dis_dateStr = dis_date.split(/[-]/);
	var company = 'IBM'; 

	
describe('(Test ID: BBHK_CR1) Add computer - valid entries', function() {
	console.log(" ############ (Test ID: BBHK_CR1) Add computer - valid entries");

	it('Loads the Home page', function() {
		//Expected: User is on home page
		homePage.gohome();
		
		expect(browser.getTitle()).toEqual('Computers database');
		expect(browser.getCurrentUrl()).toBe(homePage.el.url);
	});
	
	it('Verifies if the computer is already present', function() {
		//Expected: Computer is not found
		homePage.search_c(c_name);
		
		expect(resPage.el.nor_text.isPresent()).toBe(true);
		expect(homePage.el.h1.getText()).toBe('No computers found');
		console.log("Computer " + c_name + " not already in the db");
	});	

	it('Opens the "Add new computer" page', function() {
		//Expected: User is taken to Add a computer page.
		//Expected: Url changed to http://computer-database.herokuapp.com/computers/new
		homePage.el.addButton.click();
		
		expect(browser.getCurrentUrl()).toBe(addPage.el.url);
		expect(homePage.el.h1.getText()).toBe('Add a computer');
	});	

	it('Fills in the test data and creates the new computer', function() {
		//Expected: User is taken back to previous page.
		//Expected: Url changed to home page url
		//Expected: Confirmation message is displayed: "Done! Computer @c_name has been created".
				
		addPage.set_computer_name(c_name); console.log("Computer name: " + c_name);
		addPage.set_iDate(in_date); console.log("Introduced date: " + in_date);
		addPage.set_dDate(dis_date); console.log("Discontinued date: " + dis_date);
		addPage.set_company(company); console.log("Company name: " + company);
		addPage.el.create_Button.click();
		
		expect(browser.getCurrentUrl()).toBe(homePage.el.url);
		expect(homePage.el.alertmsg.getText()).toBe('Done! Computer '+c_name+' has been created');
	});	

	it('Searches for the newly created computer', function() {
		//Expected: Computer is found and only one result appears in the list.
		//Expected: In the search results, the Computer name, Introduced , Discontinued, Company columns correspond to the data previously entered.
		homePage.search_c(c_name);
		
		expect(resPage.el.nor_text.isPresent()).toBe(false); //Verifies that the no results message is not present
		expect(homePage.el.h1.getText()).toBe('One computer found'); 
		expect(resPage.el.row2.isPresent()).toBe(false);//Verifies that there is only one result
		console.log("Computer " + c_name + " was found");
		
		expect(resPage.el.cname.getText()).toBe(c_name); //Verifies the computer name
		expect(resPage.el.idate.getText()).toBe(in_dateStr[2] + ' ' + months[in_dateStr[1]] + ' ' + in_dateStr[0]); // verifies the introduced date
		console.log("In date is:  " + in_dateStr[2] + ' ' + months[in_dateStr[1]] + ' ' + in_dateStr[0]);
		expect(resPage.el.ddate.getText()).toBe(dis_dateStr[2] + ' ' + months[dis_dateStr[1]] + ' ' + dis_dateStr[0]);// verifies the discontinued date
		console.log("Dis date is:  " + dis_dateStr[2] + ' ' + months[dis_dateStr[1]] + ' ' + dis_dateStr[0]);
		expect(resPage.el.company.getText()).toBe(company); // verifies the company
	});	

});


describe('(Test ID: BBHK_U1) Update computer - valid entries', function() {
	console.log(" ############ (Test ID: BBHK_U1) Update computer - valid entries");
	
	var c_name_new = 'TCA100/01'; 
	var in_date_new = '2015-08-31'; 
	var in_date_newStr = in_date_new.split(/[-]/);
	var dis_date_new = '2016-02-29'; 
	var dis_date_newStr = dis_date_new.split(/[-]/);
	var company_new = 'Nokia'; 
	
	it('Verifies that the new computer is not already present in the db', function() {
		//Expected: New computer is not found.
		homePage.el.searchBox.clear();
		homePage.search_c(c_name_new);
		
		expect(resPage.el.nor_text.isPresent()).toBe(true);
		expect(homePage.el.h1.getText()).toBe('No computers found');
	});
	
	it('Loads the search results page for the computer', function() {
		//Expected: User is on results page
		resPage.getResults(c_name);

		expect(browser.getCurrentUrl()).toBe(homePage.el.url+"?f="+c_name);
	});
	
	it('Opens the computer edit page', function() {
		//Expected: User is taken to Edit computer page.
		resPage.el.cname.click();
		
		expect(homePage.el.h1.getText()).toBe('Edit computer');
	});	
	
	it('Replaces the computer fields with the new data and saves the changes', function() {
		//Expected: User is taken back to home page.
		//Expected: Url changed to http://computer-database.herokuapp.com/computers
		//Expected: Confirmation message is displayed: "Done! Computer @c_name_new has been updated".

		//Clear fields
		addPage.el.computer_Field.clear();
		addPage.el.intrDate_Field.clear();
		addPage.el.discDate_Field.clear();
		
		//Input new data
		addPage.set_computer_name(c_name_new); console.log("Computer name: " + c_name);
		addPage.set_iDate(in_date_new); console.log("Introduced date: " + in_date);
		addPage.set_dDate(dis_date_new); console.log("Discontinued date: " + dis_date);
		addPage.set_company(company_new); console.log("Company name: " + company);
		//Saving
		addPage.el.save_Button.click();
		
		expect(browser.getCurrentUrl()).toBe(homePage.el.url);
		expect(homePage.el.alertmsg.getText()).toBe('Done! Computer '+c_name_new+' has been updated');
	});
	
	it('Verifies that the initial computer is not found anymore ', function() {
		//Expected: Initial computer is not found.
		homePage.search_c(c_name);
		
		expect(resPage.el.nor_text.isPresent()).toBe(true);
		expect(homePage.el.h1.getText()).toBe('No computers found');
		console.log("Computer " + c_name + " not already in the db");
	});
	
	it('Verifies that the new computer is not found and has the correct values ', function() {
		//Expected: The new computer is found.
		//Expected: The Computer name, Introduced , Discontinued, Company columns correspond to the updated data. 
		homePage.el.searchBox.clear();
		homePage.search_c(c_name_new);
		
		expect(homePage.el.h1.getText()).toBe('One computer found'); 
		expect(resPage.el.row2.isPresent()).toBe(false);//Verifies that there is only one result
		console.log("Computer " + c_name_new + " was found");
		
		expect(resPage.el.cname.getText()).toBe(c_name_new); //Verifies the computer name
		console.log("New computer name is " + c_name_new);
		expect(resPage.el.idate.getText()).toBe(in_date_newStr[2] + ' ' + months[in_date_newStr[1]] + ' ' + in_date_newStr[0]); // verifies the introduced date
		console.log("New in date is:  " + in_date_newStr[2] + ' ' + months[in_date_newStr[1]] + ' ' + in_date_newStr[0]);
		expect(resPage.el.ddate.getText()).toBe(dis_date_newStr[2] + ' ' + months[dis_date_newStr[1]] + ' ' + dis_date_newStr[0]);// verifies the discontinued date
		console.log("New dis date is:  " + dis_date_newStr[2] + ' ' + months[dis_date_newStr[1]] + ' ' + dis_date_newStr[0]);
		expect(resPage.el.company.getText()).toBe(company_new); // verifies the company
	});
	

});

describe('(Test ID: BBHK_D1) Delete computer', function() {
	console.log(" ############ (Test ID: BBHK_D1) Delete computer");
	
	var c_name = 'TCA100/01'; 
	var company = 'Nokia'; 

	it('Loads the search results page for the computer', function() {
		//Expected: User is on results page
		resPage.getResults(c_name);

		expect(browser.getCurrentUrl()).toBe(homePage.el.url+"?f="+c_name);
	});
	
	it('Opens the computer edit page', function() {
		//Expected: User is taken to Edit computer page.
		resPage.el.cname.click();
		
		expect(homePage.el.h1.getText()).toBe('Edit computer');
	});	
	
	it('Deletes the computer', function() {
		//Expected: The new computer is found.
		//Expected: The Computer name, Introduced , Discontinued, Company columns correspond to the updated data. 
		addPage.el.delete_Button.click();
		
		expect(browser.getCurrentUrl()).toBe(homePage.el.url);
		expect(homePage.el.alertmsg.getText()).toBe('Done! Computer has been deleted');
	});

	it('Verifies that the computer is not found anymore ', function() {
		//Expected: Computer is no longer found.
		homePage.el.searchBox.clear();
		homePage.search_c(c_name);
		
		expect(resPage.el.nor_text.isPresent()).toBe(true);
		expect(homePage.el.h1.getText()).toBe('No computers found');
		console.log("Computer " + c_name + " was deleted successfully");
	});
});