var formControl = $('.sendRecord .form-select .form-control');

formControl.each(function(i, item) {
	$(item).change(function() {
		$(this).next().fadeIn().css("display","inline-block");
	});
})
$('.sendRecord .btn-search').click(function() {
	if ($(this).prev().val() == '') {
		$('#myModal').modal('show')
	}
})

$('.form_date_begin1').datetimepicker({
    language:  'zh-CN',
    weekStart: 1,
    todayBtn:  1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0
});

$('.form_date_begin').datetimepicker({
    language:  'zh-CN',
    weekStart: 1,
    todayBtn:  1,
	autoclose: 1,
	todayHighlight: 1,
	startView: 2,
	minView: 2,
	forceParse: 0
});