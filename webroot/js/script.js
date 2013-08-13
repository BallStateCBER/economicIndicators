function prepareSidebar() {
	var opening_group = false;
	/*
	$('.menu_section a.group').click(function(event) {
		event.preventDefault();
		
		// Take no action if a group is in the process of being opened
		if (opening_group) {
			return;
		}
		
		opening_group = true;
		var list = $(this).next('.categories_in_group');
		$('#content').fadeOut(200, function() {
			$(this).empty();
			$(this).append(list.clone());
			$('#content').fadeIn(200, function() {
				opening_group = false;
			});
		});
	});
	*/
}

function setupReleaseCalendar(release_dates) {
	var d = new Date();
	var this_year = d.getFullYear();
	var this_month = d.getMonth();
	var beginning_of_month = new Date(this_year, this_month, 1);
	
	if (release_dates.max_date) {
		var last_date_split = release_dates.max_date.split('-');
		var last_date = new Date(last_date_split[0], last_date_split[1] - 1, last_date_split[2]);
	} else {
		var last_date = null;
	}
	
	var tooltip_options = {
		items: '.has_releases',
		tooltipClass: 'release_date_tooltip',
		position: {
			my: 'left bottom',
			at: 'right top'
		},
		content: function() {
			var element = $(this);
			var date = element.attr('title');
			if (release_dates.hasOwnProperty(date)) {
				var tooltip = '<ul>';
				for (var i = 0; i < release_dates[date].length; i++) {
					var loc = release_dates[date][i]['location_type_name'];
					var cat = release_dates[date][i]['category'];
					tooltip += '<li><strong>'+cat+'</strong> <span class="loc_type">'+loc+'</span></li>';
					if (i == 0) {
						//tooltip += '<br />';
					}
				}
				tooltip += '</ul>';
				return tooltip;
			} else {
				return null;
			}
		}
	};
	
	$('#release_calendar').datepicker({
		// Since only the upcoming releases are provided, 
		// don't allow the user to navigate to past months
		minDate: beginning_of_month,
		maxDate: last_date,
		
		hideIfNoPrevNext: true,
		
		prevText: '&larr;',
		nextText: '&rarr;',
		
		beforeShowDay: function(date) {
			var day = date.getDate().toString();
			if (day < 10) {
				day = '0'+day.toString();
			}
			// Because they're zero-indexed for some reason
			var month = (date.getMonth() + 1).toString();
			if (month < 10) {
				month = '0'+month;
			}
			var year = date.getFullYear().toString();
			var formatted_date = year+'-'+month+'-'+day;
			if (release_dates.hasOwnProperty(formatted_date)) {
				var class_name = 'has_releases';
				var tooltip = year+'-'+month+'-'+day;
				var selectable = true;
			} else {
				var class_name = 'no_releases';
				var tooltip = null;
				var selectable = false;
			}
			return [selectable, class_name, tooltip];
		},
		
		onChangeMonthYear: function() {
			$(this).tooltip(tooltip_options);
			$(this).find('tbody a').click(function (event) {
				event.preventDefault();
			});
		}
	}).tooltip(tooltip_options).append('');
}