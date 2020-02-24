var app = {};
$(document).ready(function(){
  if($('#emicalculatorform').length !=0 ){
    var myChart = new Highcharts.chart('container', {
        chart: {
          renderTo: 'container',
          type: 'pie'
        },
        title: {
            text: 'Break Up of total payment'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Payment',
          colorByPoint: true,
          data: []
        }]
    });
    app.calculateEmi = function(app){
        let amount = $('[name=loanamount]').val();
        amount = amount.split(',').join('');
        let interest = parseFloat($('[name=loaninterest]').val()).toFixed(2);
        interest = (interest/12/100);
        let term = parseInt($('[name=loanterm]').val());
        let tenure = $('[name=loantenure]:checked').val();
        if(tenure == 'loanyears') term = term*12;
        let temp = Math.pow(interest + 1 , term);
        let temp2 = (+amount * interest * temp);
        let emi = temp2/(temp-1);
        // E = P.r.(1+r)n/((1+r)n-1)
        $('#emi').text('EMI:₹ ' + Math.round(emi) + ' / month');
        let total = parseInt(emi*term)
        let html = $('<div>').html('Interest Paying: ' + (total - amount) +' / month<br>Total Paying: ' + total+' / month');
        $('#emi').append(html);
        myChart.series[0].setData([{
            name: 'Prinipal',
            y: +amount
          }, {
            name: 'Interest',
            y: +(total - amount)
          }]);
        // myChart.series[0].setPoint();
        return emi;
    }

    app.calculateEmi();
    $(document).on('change input keyup','[name=loanamount]',app.calculateEmi);
    $(document).on('change input keyup','[name=loaninterest]',app.calculateEmi);
    $(document).on('change input keyup','[name=loanterm]',app.calculateEmi);
    $(document).on('change','[name=loantenure]',function(){
        if($('[name=loantenure]:checked').val() == 'loanmonths'){
            $('[name=loanterm]').val($('[name=loanterm]').val()*12);
        }else{
            $('[name=loanterm]').val($('[name=loanterm]').val()/12);
        }
    });
  }
    $(document).on('submit','#smtper',function(e){
        e.preventDefault();
        $form = $(this);
        $form.find('[type=submit]').attr('disabled',true);
        $.post('/check-smtp',$(this).serialize(), function(data){
            if(data.status){
              $('#error').html('<div class="alert alert-danger">Email sent successfully</div>');
            }else{
              $('#error').html('<div class="alert alert-danger">'+data.message+'</div>');
            }
            $form.find('[type=submit]').attr('disabled',false);
        });
    });
    $(document).on('change','[name=auth]', function(){
      if($(this).is(':checked')){
        $('[name=username]').attr('disabled', false);
        $('[name=password]').attr('disabled', false);
      }else{
        $('[name=username]').attr('disabled', true);
        $('[name=password]').attr('disabled', true);
      }
    })
});
