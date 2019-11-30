document.addEventListener("DOMContentLoaded", function() {
	fill_month_list();

  var ml = document.getElementById("month_list");
	ml.onchange = function() {
		changeMonthData();
	};
});



function fill_month_list() {
	var ml = document.getElementById("month_list");

	console.log(ml);

	// Lösche alle Einträge
	while(ml.options.length > 0){
		ml.options.remove(0)
	};

	for (i = 1; i <= 12; i++){
		var option=document.createElement("option");
		switch(i){
			case 1:
				option.text = "Januar"; break;
			case 2:
				option.text = "Februar"; break;
			case 3:
				option.text = "März"; break;
			case 4:
				option.text = "April"; break;
			case 5:
				option.text = "Mai"; break;
			case 6:
				option.text = "Juni"; break;
			case 7:
				option.text = "Juli"; break;
			case 8:
				option.text = "August"; break;
			case 9:
				option.text = "September"; break;
			case 10:
				option.text = "Oktober"; break;
			case 11:
				option.text = "November"; break;
			case 12:
				option.text = "Dezember"; break;
		};
		option.value=i;
		ml.options.add(option,null);
	};
};

function changeMonthData(){
	// Extrahiere selektierten Monat
	var ml = document.getElementById("month_list");
	var current_month = ml.options[ml.selectedIndex];
	var current_month_text = current_month.text;
	console.log(current_month_text);
};
