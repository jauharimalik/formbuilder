function save_form(build, option, con, rec)
{
  window.saving = true;

  jQuery('#save_form_btn').button('loading');

  var build = jQuery.toJSON(build);
  build = deflate(build);
  build = encodeURIComponent(build); 

  var option = jQuery.toJSON(option);
  option = deflate(option);
  option = encodeURIComponent(option);

  var rec = jQuery.toJSON(rec);
  rec = encodeURIComponent(rec);

  var con = jQuery.toJSON(con);
  con = encodeURIComponent(con);

  var html = encodeURIComponent(jQuery('.html_here').html());
  var id = jQuery('.form_id').attr('val');

  jQuery.ajax({
    url: 'function.php',
    type: "POST",
    data: 'action=formcraft_update&content='+html+'&build='+build+'&option='+option+'&con='+con+'&rec='+rec+'&id='+id,
    success: function (response) {
      jQuery('#save_form_btn').button('reset');
      window.saving = false;
    },
    error: function (response) {
      jQuery('#save_form_btn').button('error');
      window.saving = false;
    }
  });

}


function export_form(build, option, con, rec)
{

  var build = jQuery.toJSON(build);
  var option = jQuery.toJSON(option);
  var con = jQuery.toJSON(con);
  var rec = jQuery.toJSON(rec);

  jQuery('#export_build').val(build);
  jQuery('#export_option').val(option);
  jQuery('#export_con').val(con);
  jQuery('#export_rec').val(rec);

  jQuery('#export_form_form').submit();

}

// Perform Fixing Funtion
function builder_interval()
{

    // Fix Height of Add-On
    jQuery('.add-on').each(function(){
      var he = jQuery(this).prev('input').outerHeight();
      he = parseInt(he);
      jQuery(this).css({'height':he+'px'});
    });

    // Fix Height of Captcha Image
    jQuery('.c_image').each(function(){
      var he = jQuery(this).next('input').outerHeight();
      he = parseInt(he);
      jQuery(this).css({'height':he+'px'});

    });

  }



  function add_sliders(options)
  {


    jQuery('.add-on').each(function(){

      var he = jQuery(this).prev('input').outerHeight();
      he = parseInt(he);
      jQuery(this).css({'height':he+'px'});

    });


    jQuery('.c_image').each(function(){

      var he = jQuery(this).next('input').outerHeight();
      he = parseInt(he);
      jQuery(this).css({'height':he+'px'});

    });


    jQuery('.slider').each(function(){

      var id = this.id.split('_');

      if (!(id[3]))
      {
        id[3] = 0;
      }
      if (!(id[4]))
      {
        id[4] = 100;
      }

      if (options && jQuery("#"+this.id).hasClass('ui-slider'))
      {

        jQuery( "#"+this.id ).slider('option', {
          min: parseInt(id[3]),
          max: parseInt(id[4])
        });
      }
      else 
      {
        jQuery( "#"+this.id ).slider({
          min: parseInt(id[3]),
          max: parseInt(id[4]),
          range: 'min',
          value: 0,
          slide: function( event, ui ) 
          {
            jQuery( "#"+this.id+"_val" ).html( ui.value );
            jQuery( "#"+this.id+"_val2" ).val( ui.value );
          }
        });
      }

    });


    jQuery('.slider-range').each(function(){

      var id = this.id.split('_');

      if (!(id[3]))
      {
        id[3] = 0;
      }
      if (!(id[4]))
      {
        id[4] = 100;
      }

      if (options && jQuery("#"+this.id).hasClass('ui-slider'))
      {

        jQuery( "#"+this.id ).slider('option', {
          min: parseInt(id[3]),
          step: Math.max(parseInt(id[4])/100, 1),
          max: parseInt(id[4])
        });
      }
      else 
      {
        jQuery( "#"+this.id ).slider({
          min: parseInt(id[3]),
          step: Math.max(parseInt(id[4])/100, 1),
          max: parseInt(id[4]),
          range: true,
          values: [0, parseInt(id[4])*.3],
          slide: function( event, ui ) 
          {
            jQuery( "#"+this.id+"_val" ).html( ui.values[0]+' - '+ui.values[1] );
            jQuery( "#"+this.id+"_val2" ).val( ui.values[0]+', '+ui.values[1] );
          }
        });
      }

    });


  }





// Trigger a Click on 'SAVE' button
var save_formcraft = function save_formcraft()
{
  jQuery('#save_form_btn').trigger('click');
}





jQuery(document).ready(function () {


  // FF Bug Fix
  jQuery('.min-btn').removeAttr('disabled');

  setTimeout("add_field_call()", 500);

  setInterval(function(){builder_interval();},2000);





  // Set up DataTable
  if (jQuery('#subs').length)
  {
    jQuery('#subs').dataTable({
      "sPaginationType": "full_numbers"
    });
    jQuery('#ext').dataTable({
      "sPaginationType": "full_numbers"
    });
    jQuery('#files_manager_table').dataTable({
      "sPaginationType": "full_numbers"
    });
  }


  jQuery('.btn-toggle').click(function(){
    if (jQuery(this).hasClass('active'))
    {
      jQuery(this).removeClass('active');
    }
    else 
    {
      jQuery(this).addClass('active');
    }
  });




 }); // End of Document Ready



// declare a new module, and inject the $compileProvider
angular.module('compile', [], function($compileProvider) {


  // configure new 'compile' directive by passing a directive
  // factory function. The factory function injects the '$compile'
  $compileProvider.directive('compile', function($compile) {
    // directive factory creates a link function
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
           // watch the 'compile' expression for changes
           return scope.$eval(attrs.compile);
         },
         function(value) {
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html(value);
          $compile(element.contents())(scope);
        }
        );
    };
  });


$compileProvider.directive('scale', function() {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
            element.addClass('anim');
            var abc = setTimeout(function(){
              element.removeClass('anim')},1000);
        }
    };
});


  $compileProvider.directive('tooltip', function () {
    return {
      restrict:'A',
      link: function(scope, element, attrs)
      {
        $(element)
        .attr('title',scope.$eval(attrs.tooltip))
        .tooltip({placement: "right"});
      }
    }
  });

});





// Email Validation
function validateEmail(email) { 
  email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,12}$/i;
  if(!email_regex.test(email))
    { return false;  }
  else
    {return true;}
} 




 // Angular JS Function
 function bob_the_builder($scope, $http)
 {

  $scope.toggle = true;

  var sortableEle;
  var sortableEle2;
  var slideris;

  J = new Object();
  J.B = window.jb;
  J.O = window.jo;
  J.R = window.jr;
  J.C = window.jc;

  $scope.dragStart = function(e, ui) {
    ui.item.data('start', ui.item.index());
  }
  $scope.dragEnd = function(e, ui) {
    var start = ui.item.data('start'),
    end = ui.item.index();
    $scope.build.splice(end, 0, 
      $scope.build.splice(start, 1)[0]);
    $scope.$apply();
  }


  sortableEle = jQuery('.form_ul').sortable({
    placeholder: "li_placeholder nform_li",
    delay: 100,
    distance: 20,
    start: $scope.dragStart,
    update: $scope.dragEnd
  });

  sortableEle2 = jQuery('.options_ul').sortable({
    placeholder: "li_placeholder nform_li",
    start: $scope.dragStart,
    update: $scope.dragEnd
  });





  if (!(J.B))
  {
    $scope.build = [];
    $scope.is_new = true;
  }
  else 
  {
    var temp_b = inflate(J.B);
    if (temp_b==null)
    {
      $scope.build = jQuery.evalJSON(J.B);
    }
    else
    {
      $scope.build = jQuery.evalJSON(temp_b);
    }
  }

  $scope.build.le = $scope.build.length;

  var i = 0;
  $scope.build.captcha = 0;
  while (i<$scope.build.le)
  {
    if($scope.build[i].captcha==1)
    {
      $scope.build.captcha = 1;
    }
    i = i + 1;
  }

  var i = 0;
  $scope.build.upload = 0;
  while (i<$scope.build.le)
  {
    if($scope.build[i].upload==1)
    {
      $scope.build.upload = 1;
    }
    i = i + 1;
  }

  if (!(J.O))
  {
    $scope.option = [];
  }
  else 
  {
    var temp_o = inflate(J.O);
    if (temp_o==null)
    {
      $scope.option = jQuery.evalJSON(J.O);
    }
    else
    {
      $scope.option = jQuery.evalJSON(temp_o);
    }
  }

  if (!(J.R))
  {
    $scope.recipients = [];
  }
  else 
  {
    $scope.recipients = jQuery.evalJSON(J.R);
  }

  if (!(J.C))
  {
    $scope.con = [];
  }
  else 
  {
    $scope.con = jQuery.evalJSON(J.C);
  }



  slideris = jQuery( ".con_slider" ).slider({
    min: 0,
    max: 100,
    slide: function( event, ui ) {
      var id_is = jQuery(this).attr('id');
      jQuery( "#"+id_is+"_v" ).val( ui.value );
      jQuery( "#"+id_is+"_v" ).trigger( 'input');
    }
  });

  if($scope.stext==undefined)
  {
    $scope.stext = 'Submit';
  }
  if($scope.form_title==undefined)
  {
    $scope.form_title = 'Form Title';
  }
  if($scope.ft_px==undefined)
  {
    $scope.ft_px = 32;
  }
  if($scope.sfs==undefined)
  {
    $scope.sfs = 14;
  }
  if($scope.lp==undefined)
  {
    $scope.lp = '0px';
  }
  if($scope.bp==undefined)
  {
    $scope.bp = '20px';
  }
  if($scope.tp==undefined)
  {
    $scope.tp = '15px';
  }
  if($scope.theme==undefined)
  {
    $scope.theme = 'none';
  }
  if($scope.spad1==undefined)
  {
    $scope.spad1 = '8px';
  }
  if($scope.spad2==undefined)
  {
    $scope.spad2 = '14px';
  }
  if($scope.spad2==undefined)
  {
    $scope.spad2 = '14px';
  }
  if($scope.themev==undefined)
  {
    $scope.themev = 'three';
  }
  if($scope.lfs==undefined)
  {
    $scope.lfs = 14;
  }
  if($scope.slfs==undefined)
  {
    $scope.slfs = 11;
  }
  if($scope.sbold==undefined)
  {
    $scope.sbold = 'normal';
  }
  if($scope.tbold==undefined)
  {
    $scope.tbold = 'normal';
  }
  if($scope.ftalign==undefined)
  {
    $scope.ftalign = 'left';
  }
  if($scope.space==undefined)
  {
    $scope.space = 8;
  }
  if($scope.sub_th==undefined)
  {
    $scope.sub_th = 'boots';
  }
  if($scope.email_sub==undefined)
  {
    $scope.email_sub = 'New Form Submission for {{form_name}}';
  }
  if($scope.error_gen==undefined)
  {
    $scope.error_gen = 'Please correct the errors and try again';
  }
  if($scope.error_email==undefined)
  {
    $scope.error_email = 'Incorrect email format';
  }
  if($scope.error_url==undefined)
  {
    $scope.error_url = 'Incorrect URL format';
  }
  if($scope.error_ftype==undefined)
  {
    $scope.error_ftype = 'Incorrect file type';
  }
  if($scope.error_captcha==undefined)
  {
    $scope.error_captcha = 'Incorrect captcha';
  }
  if($scope.error_only_integers==undefined)
  {
    $scope.error_only_integers = 'Only integers';
  }
  if($scope.error_required==undefined)
  {
    $scope.error_required = 'This field is required';
  }
  if($scope.error_min==undefined)
  {
    $scope.error_min = 'At least {{min_chars}} characters required';
  }
  if($scope.error_max==undefined)
  {
    $scope.error_max = 'Maximum {{max_chars}} characters allowed';
  }
  if($scope.ruser==undefined)
  {
    $scope.ruser = 'ncrafts';
  }
  if($scope.fw==undefined)
  {
    $scope.fw = '480px';
  }
  if($scope.block_label==undefined)
  {
    $scope.block_label = 'no_block_label';
  }
  if($scope.form_sent==undefined)
  {
    $scope.form_sent = 'Your message was sent. We will get back to you asap!';
  }
  if($scope.form_not_sent==undefined)
  {
    $scope.form_not_sent = '<span style="color: red">Looks like there was an error. Sorry.</span>';
  }
  if($scope.autoreply==undefined)
  {
    $scope.autoreply = 'Hey,\n\nThis is just a confirmation message. We have received you reply and will get back to you soon.\n\nRegards,\nTeam nCrafts';
  }
  if($scope.autoreply_s==undefined)
  {
    $scope.autoreply_s = 'Just Confirming';
  }
  if($scope.formpage==undefined)
  {
    $scope.formpage = 'false';
  }
  if($scope.mail_type==undefined)
  {
    $scope.mail_type = 'mail';
  }
  if($scope.flayout==undefined)
  {
    $scope.flayout = 'horizontal';
  }
  if($scope.success_msg==undefined)
  {
    $scope.success_msg = 'Message Sent';
  }
  if($scope.failed_msg==undefined)
  {
    $scope.failed_msg = 'Message Could Not Be Sent';
  }
  if($scope.placeholder==undefined)
  {
    $scope.placeholder = 'no_placeholder';
  }
  if($scope.field_font==undefined)
  {
    $scope.field_font = 14;
  }
  if($scope.direction==undefined)
  {
    $scope.direction = 'ltr';
  }
  if($scope.cl_hidden_fields==undefined)
  {
    $scope.cl_hidden_fields = 'submit_hidden';
  }
  if($scope.user_save_form==undefined)
  {
    $scope.user_save_form = 'no_save_form';
  }
  if($scope.field_align==undefined)
  {
    $scope.field_align = 'left';
  }





  if($scope.con.length==0)
  {
    $scope.con.push({
      stext:$scope.stext,
      form_title:$scope.form_title,
      ft_px:$scope.ft_px,
      sfs:$scope.sfs,
      lp:$scope.lp,
      bp:$scope.bp,
      tp:$scope.tp,
      spad1:$scope.spad1,
      spad2:$scope.spad2,
      themev:$scope.themev,
      lfs:$scope.lfs,
      slfs:$scope.slfs,
      sbold:$scope.sbold,
      tbold:$scope.tbold,
      ftalign:$scope.ftalign,
      space:$scope.space,
      sub_th:$scope.sub_th,
      email_sub:$scope.email_sub,
      error_gen:$scope.error_gen,
      error_email:$scope.error_email,
      error_url:$scope.error_url,
      error_captcha:$scope.error_captcha,
      error_ftype:$scope.error_ftype,
      error_only_integers:$scope.error_only_integers,
      error_required:$scope.error_required,
      error_min:$scope.error_min,
      error_max:$scope.error_max,
      ruser:$scope.ruser,
      fw:$scope.fw,
      block_label:$scope.block_label,
      form_sent:$scope.form_sent,
      form_not_sent:$scope.form_not_sent,
      autoreply:$scope.autoreply,
      autoreply_s:$scope.autoreply_s,
      formpage:$scope.formpage,
      mail_type:$scope.mail_type,
      success_msg:$scope.success_msg,
      failed_msg:$scope.failed_msg,
      flayout:$scope.flayout,
      placeholder:$scope.placeholder,
      field_font:$scope.field_font,
      direction:$scope.direction,
      field_align:$scope.field_align,
      cl_hidden_fields:$scope.cl_hidden_fields,
      user_save_form:$scope.user_save_form,
      theme:$scope.theme
    });
}




$scope.remRec = function ($index, series)
{
  $scope.recipients.splice($index, 1);
}
$scope.addRec = function ()
{
  if (validateEmail($scope.rec))
  {
    $scope.recipients.push({
      val:$scope.rec
    });
    $scope.rec = '';
  } else
  {
    alert('Invalid E-mail');
  }
}


$scope.addCL = function ($index)
{
  $scope.build[$index].CL.push({
    CL_html:"<span class='sp1 cl_cover'><div style='width: 233px'><label>if this element</label><select ng-model='el2.law' ng-change='el.LAW[$index].law=el2.law' style='width: 110px'><option value='='>equals</option><option value='>'>is greater than</option><option value='<'>is less than</option></select><input type='text' ng-model='el2.equals' ng-change='el.LAW[$index].equals=el2.equals' style='width: 90px'></div><div style='width: 88px'><label>then</label><select ng-model='el2.doit' ng-change='el.LAW[$index].doit=el2.doit' style='width: 70px'><option value=''></option><option value='show'>Show</option><option value='hide'>Hide</option></select></div><div style='width: 90px'><label>element</label><select ng-model='el2.to' ng-change='el.LAW[$index].to=el2.to' style='width: 90px; margin-right: 10px'><option ng-repeat='el in build'>{{$index}}</option></select><button class='btn btn-danger cl_del' title='Delete' ng-click='remCL($index, $parent.$index)'>×</button></div></span>"
  });
  $scope.build[$index].LAW.push({
    equals:"",
    do:"",
    to:""
  });
}
$scope.remCL = function ($index, $parent_index)
{
  $scope.build[$parent_index].CL.splice($index, 1);
  $scope.build[$parent_index].LAW.splice($index, 1);
}

$scope.remOpt = function ($index, series)
{
  $scope.option[series].Drop.splice($index, 1);
}
$scope.addOpt = function (series, type)
{

  if (type=='matrix')
  {
    $scope.option[series].Drop.push({
      val:"Timeliness"
    });
  }
  else if(type=='smiley')
  {
    alert('Cannot add more options here!');
  }
  else if(type=='pre-countries')
  {
    $http({method: 'GET', url: window.base+'/data/countries.json' }).
    success(function(data, status, headers, config) 
    {
      for (var i in data)
      {
        $scope.option[series].Drop.push({
          val: data[i].Item
        });
      }
    }).
    error(function(data, status, headers, config) 
    {
      alert('Error');
    });
  }
  else if(type=='pre-states')
  {
    $http({method: 'GET', url: window.base+'/data/states.json' }).
    success(function(data, status, headers, config) 
    {
      for (var i in data)
      {
        $scope.option[series].Drop.push({
          val: data[i].Item
        });
      }
    }).
    error(function(data, status, headers, config) 
    {
      alert('Error');
    });
  }
  else if(type=='pre-lang')
  {
    $http({method: 'GET', url: window.base+'/data/languages.json' }).
    success(function(data, status, headers, config) 
    {
      for (var i in data)
      {
        $scope.option[series].Drop.push({
          val: data[i].Item
        });
      }
    }).
    error(function(data, status, headers, config) 
    {
      alert('Error');
    });
  }
  else
  {
    $scope.option[series].Drop.push({
      val:"Option",
      smin:"10",
      smax:"100"
    });
  }
  setTimeout("add_sliders()", 300);

}


$scope.remEl = function($index) {

  if($scope.build[$index].captcha==1)
  {
    $scope.build.captcha = 0;
  }

  if($scope.build[$index].upload==1)
  {
    $scope.build.upload = 0;
  }

  jq_click_before($index);
  $scope.build.splice($index, 1);
  $scope.build.le = $scope.build.length;
}
$scope.save = function()
{
  save_form($scope.build, $scope.option, $scope.con, $scope.recipients);
}
$scope.export_form = function()
{
  export_form($scope.build, $scope.option, $scope.con, $scope.recipients);
}


$scope.addEl = function (type) {
  var inx = $scope.build.length;
  var inx2 = $scope.option.length;
  var inx = Math.max(inx,inx2);
  var random = "_"+Math.floor((Math.random() * 100) + 1)+"_";

  if (type=='text')
  {       
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>enter your full name</span></span><span class='input_cover text_cover'><input type='text' ng-style='{width: el.wid, fontSize: con[0].field_font, color: con[0].input_color}' place='{{el.cap1}}' name='{{el.cap1}}_"+type+"_{{el.valid}}_{{el.req}}_{{el.min}}_{{el.max}}_field{{$index}}_{{el.mail_field}}' class='field_class' do_what='{{el.LAW}}'><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}{{el.uniq}}</span><span class='id_text'>One-line Text Input <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='cpm{{$index}}'>Label: </label><input id='cpm{{$index}}' type='text' ng-model='el.cap1'></span><span class='sp3'><label for='cps{{$index}}'>Sub Label: </label><input id='cps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid'></span><span class='sp3'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><span class='sp3'><label style='font-weight: normal'><strong>Custom:</strong> <span class='ttip' data-toggle='tooltip' data-original-title='Field name for passing custom variables to MailChimp or MyMail' style='font-size: 12px; color: #0066ff; font-weight: normal'> (what is this)</span></label><input type='text' ng-model='el.mail_field'></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-click='el.req=!el.req' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span><br><span class='sp3'><label>Validation: </label><select ng-model='el.valid'><option value=''></option><option value='alphabets'>Alphabets Only</option><option value='integers'>Integers Only</option><option value='alpha'>Alpha-numeric Only</option><option value='email'>Email</option><option value='url'>URL</option></select></span><span class='sp3'><label for='min{{$index}}'>Min Characters: </label><input id='min{{$index}}' type='text' ng-model='el.min'></span><span class='sp3'><label for='max{{$index}}'>Max Characters: </label><input id='max{{$index}}' type='text' ng-model='el.max'></span></div><div class='opt_cl'><span class='opt_head'>3. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='hidden')
  {       
    $scope.el_f = "<input type='hidden' name='{{el.cap1}}_"+type+"_{{el.valid}}_0_{{el.min}}_{{el.max}}_field{{$index}}' value='{{el.hidval}}'>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Hidden Field <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp1' style='line-height: 140%; margin-top: 15px'>You can use this field to pass values which not be visible, or alterable, by the user filling the form. These fields will be visible in the submissions in admin panel, and in email notifications.</span><span class='sp1'><label for='cpm{{$index}}'>Label: </label><input id='cpm{{$index}}' type='text' ng-model='el.cap1'></span><span class='sp1'><label for='val{{$index}}'>Value: </label><input id='val{{$index}}' type='text' ng-model='el.hidval'></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='email')
  {       
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{fontSize: con[0].slfs, color: con[0].slfc }'></span></span><span class='input_cover text_cover'><span class='input-append' ng-style='{ width: el.wid }'><input type='email' ng-style='{fontSize: con[0].field_font, color: con[0].input_color}' place='{{el.cap1}}' style='width: 100%' name='{{el.cap1}}_"+type+"_email_{{el.req}}___field{{$index}}_{{el.autoreply}}_{{el.replyto}}_{{el.mc_add}}{{el.cm_add}}{{el.aw_add}}_{{el.mm_add}}' do_what='{{el.LAW}}' class='field_class'><span class='add-on'><i class='icon-envelope-alt'></i></span></span><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Email Input <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='cpm{{$index}}'>Label: </label><input id='cpm{{$index}}' type='text' ng-model='el.cap1'></span><span class='sp3'><label for='cps{{$index}}'>Sub Label: </label><input id='cps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid'></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1' style='min-height: 50px'><label class='label_check'><input type='checkbox' ng-model='el.autoreply' ng-true-value='autoreply'><div class='label_div' style='background: #fff'>Send Autoreply to this Email</div><span style='color:#888; font-weight: normal'>you can change the autoreply text from Options -> Email Settings</span></label></span><span class='sp1' style='min-height: 70px'><label class='label_check'><input type='checkbox' ng-model='el.replyto' ng-true-value='replyto'><div class='label_div' style='background: #fff'>Set this as 'Reply-To' Address</div><span style='color:#888; font-weight: normal'>by enabling this, when you receive an email notification, you can directly reply to this email address</span></label></span><span class='sp1 mc_show' style='min-height: 50px'><label class='label_check'><input type='checkbox' ng-model='el.mc_add' ng-true-value='m' ng-false-value=''><div class='label_div' style='background: #fff'><div class='label_div' style='background: #fff'>Add to MailChimp</div></div><span style='color:#888; font-weight: normal'>add users to your list of subscribers by checking this option</span></label></span><span class='sp1 cm_show' style='min-height: 50px'><label class='label_check'><input type='checkbox' ng-model='el.cm_add' ng-true-value='c' ng-false-value=''><div class='label_div' style='background: #fff'>Add to Campaign Monitor</div><span style='color:#888; font-weight: normal'>add users to your list of subscribers by checking this option</span></label></span><span class='sp1 aw_show' style='min-height: 50px'><label class='label_check'><input type='checkbox' ng-model='el.aw_add' ng-true-value='a' ng-false-value=''><div class='label_div' style='background: #fff'>Add to AWeber</div><span style='color:#888; font-weight: normal'>add users to your list of subscribers by checking this option</span></label></span><span class='sp1 mymail_email' style='min-height: 50px'><label class='label_check'><input type='checkbox' ng-model='el.mm_add' ng-true-value='true'><div class='label_div' style='background: #fff'>Add to MyMail</div><span style='color:#888; font-weight: normal'>add users to your list of subscribers by checking this option</span></label></span><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div><div class='opt_cl'><span class='opt_head'>3. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }

  if (type=='para')
  {       
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>enter your full name</span></span><span class='input_cover text_cover'><textarea rows='3' ng-style='{width: el.wid, fontSize: con[0].field_font, color: con[0].input_color}' place='{{el.cap1}}' name='{{el.cap1}}_"+type+"__{{el.req}}_{{el.min}}_{{el.max}}_field{{$index}}_{{el.mail_field}}' class='field_class' do_what='{{el.LAW}}'></textarea><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Paragraph Text Input <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1'></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid'></span><span class='sp3'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><span class='sp3'><label style='font-weight: normal'><strong>Custom:</strong> <span class='ttip' data-toggle='tooltip' data-original-title='Field name for passing custom variables to MailChimp or MyMail' style='font-size: 12px; color: #0066ff; font-weight: normal'> (what is this)</span></label><input type='text' ng-model='el.mail_field'></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span><span class='sp3'><label for='min{{$index}}'>Min Characters: </label><input id='min{{$index}}' type='text' ng-model='el.min'></span><span class='sp3'><label for='max{{$index}}'>Max Characters: </label><input id='max{{$index}}' type='text' ng-model='el.max'></span></div><div class='opt_cl'><span class='opt_head'>3. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='dropdown')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>select your country</span></span><span class='input_cover text_cover'><select class='field_class' do_what='{{el.LAW}}' ng-style='{width: el.wid, fontSize: con[0].field_font, height: con[0].field_font*2, color: con[0].input_color}' place='{{el.cap1}}' name='{{el.cap1}}_"+type+"__{{el.req}}___field{{$index}}'><option ng-repeat='opt in option["+inx+"].Drop'>{{opt.val}}</option></select><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Dropdown Box <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp3 opt_s3'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px' ng-model='opt.val'></span><span class='sp3 opt_s3'><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+")'><i class='icon-plus icon-white'></i></button></span><span class='sp1'>Pre-Populate Lists<br><span class='btn-group'><button class='btn btn-primary' ng-click='addOpt("+inx+", "+'"pre-countries"'+")'>Countries</button><button class='btn btn-primary' ng-click='addOpt("+inx+", "+'"pre-states"'+")'>US States</button><button class='btn btn-primary' ng-click='addOpt("+inx+", "+'"pre-lang"'+")'>Common Languages</button></span></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div><div class='opt_cl'><span class='opt_head'>4. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='check')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>you can select more than one!</span></span><span class='input_cover' style='display: inline-block'><span class='box_cover {{el.lines}}'><div class='new_ldiv' ng-repeat='opt in option["+inx+"].Drop' ng-style='{color: el.ocolor, width: el.wid, fontSize: con[0].field_font}' for='check"+inx+"{{$index}}' style=' display: inline-block'><label class='label_check' ng-class='el.tick_type' style='height: 20px; width: 0px'><input  class='field_class_checkbox' do_what='{{el.LAW}}' type='checkbox' class='label_check' value='{{opt.val}}' id='check"+inx+"{{$index}}' name='{{el.cap1}}_"+type+"__{{el.req}}___field{{$parent.$index}}'></label><div class='label_div'>{{opt.val}}</div></div><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>CheckBox Group <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp3 opt_s3'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px'  ng-model='opt.val'></span><span class='sp3 opt_s3'><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+")'><i class='icon-plus icon-white'></i></button></span><br><span class='sp3'><label for='ocolor{{$index}}'>Color: <input class='cpicker' id='ocolor{{$index}}' ng-model='el.ocolor' style='width: 95px'></label></span><span class='sp1'><label class='label_radio tick_default' style='width: 40px'><input name='tick_type{{$index}}' type='radio' ng-model='el.tick_type' value='default'><div class='label_div' style='background: #fff'><span class='tick_none'>Default</span></div></label><label class='label_radio tick_default'><input name='tick_type{{$index}}' type='radio' ng-model='el.tick_type' value='ticked'><div class='label_div' style='background: #fff'><span class='tick_default'></span></div></label><label class='label_radio tick_circled'><input name='tick_type{{$index}}' type='radio' checked='checked' ng-model='el.tick_type' value='circle-ticked'><div class='label_div' style='background: #fff'><span class='tick_circled'></span></div></label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div><div class='opt_cl'><span class='opt_head'>4. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='radio')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>select one</span></span><span class='input_cover' style='display: inline-block'><span class='box_cover {{el.lines}}'><div class='new_ldiv' style='display: inline-block' ng-style='{color: el.ocolor, width: el.wid, fontSize: con[0].field_font}' ng-repeat='opt in option["+inx+"].Drop' for='radio"+inx+"{{$index}}'><label class='label_radio' ng-class='el.tick_type' style='height: 20px; width: 0px'><input type='radio' class='field_class_checkbox' do_what='{{el.LAW}}' value='{{opt.val}}' id='radio"+inx+"{{$index}}' name='{{el.cap1}}_"+type+"__{{el.req}}___field{{$parent.$index}}'></label><div class='label_div' >{{opt.val}}</div></div><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Radio Group <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp3 opt_s3'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px' ng-model='opt.val'></span><span class='sp3 opt_s3'><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+")'><i class='icon-plus icon-white'></i></button></span><br><span class='sp3'><label for='ocolor{{$index}}'>Color: <input class='cpicker' id='ocolor{{$index}}' ng-model='el.ocolor' style='width: 95px'></label></span><span class='sp1'><label class='label_radio tick_default' style='width: 40px'><input name='tick_type{{$index}}' type='radio' ng-model='el.tick_type' value='default'><div class='label_div' style='background: #fff'><span class='tick_none'>Default</span></div></label><label class='label_radio tick_default'><input name='tick_type{{$index}}' type='radio' ng-model='el.tick_type' value='ticked'><div class='label_div' style='background: #fff'><span class='tick_default'></span></div></label><label class='label_radio tick_circled'><input name='tick_type{{$index}}' type='radio' checked='checked' ng-model='el.tick_type' value='circle-ticked'><div class='label_div' style='background: #fff'><span class='tick_circled'></span></div></label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div><div class='opt_cl'><span class='opt_head'>4. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='stars')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>select one</span></span><span class='input_cover'><span class='box_cover {{el.lines}}'><div style='margin-left: -5px'><label class='label_stars' ng-style='{color: el.ocolor, width: el.wid, fontSize: con[0].field_font}' ng-repeat='opt in option["+inx+"].Drop' for='radio"+inx+"{{$index}}' data-toggle='tooltip' data-original-title='{{opt.val}}' id='stars_"+inx+"_{{$index}}' data-reason='{{opt.textfield}}'><input type='radio' class='label_stars field_class show_{{opt.show_textfield}}' value='{{$index+1}}' id='radio"+inx+"{{$index}}' name='{{el.cap1}}_"+type+"__{{el.req}}___field{{$parent.$index}}' do_what='{{el.LAW}}'><span class='opt_val' ng-style='{ color: el.ocolor, background: con[0].bg_image }'>{{opt.val}}</span></label></div><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span><div id='textarea_"+inx+"_div' style='width: 100%; display: none' class='reason_cover'></span><div id='textarea_reason_"+inx+"' ng-style='{color: el.ocolor}' class='reason_text'></div><textarea id='textarea_"+inx+"' style='width: 90%; ' name='{{el.cap1}}-Reason_"+type+"__0___field{{$index}}_reason' class='reason_ta' rows='3'></textarea></div></span></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Star Rating <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp1 opt_s3' style='display: block'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px' ng-model='opt.val'>&nbsp;&nbsp;<label class='label_check'><div class='label_div' style='background: #fff'>Show Textfield</div><input type='checkbox' ng-model='opt.show_textfield'></label><input type='text' ng-model='opt.textfield' style='width: auto'><span class='value_rating'>Value: {{$index+1}}</span></span><span class='sp1 opt_s3'><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+", "+'"stars"'+")'><i class='icon-plus icon-white'></i></button></span><br><span class='sp3'><label for='ocolor{{$index}}'>Color: <input class='cpicker' id='ocolor{{$index}}' ng-model='el.ocolor'></label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div><div class='opt_cl'><span class='opt_head'>4. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='smiley')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>select one</span></span><span class='input_cover'><span class='box_cover {{el.lines}}'><div style='margin-left: -5px'><label class='label_smiley smiley{{$index}}' ng-style='{color: el.ocolor, width: el.wid, fontSize: con[0].field_font}' data-reason='{{opt.textfield}}' ng-repeat='opt in option["+inx+"].Drop' for='radio"+inx+"{{$index}}' data-toggle='tooltip' data-original-title='{{opt.val}}' id='stars_"+inx+"_{{$index}}'><input type='radio' class='label_smiley field_class show_{{opt.show_textfield}}' value='{{$index+1}}' do_what='{{el.LAW}}' id='radio"+inx+"{{$index}}' name='{{el.cap1}}_"+type+"__{{el.req}}___field{{$parent.$index}}'><span class='opt_val' ng-style='{ color: el.ocolor, backgroundImage: con[0].bg_image }' style='background: white'>{{opt.val}}</span></label></div><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span><div id='textarea_"+inx+"_div' style='width: 100%; display: none' class='reason_cover'></span><div id='textarea_reason_"+inx+"' ng-style='{color: el.ocolor}' class='reason_text'></div><textarea id='textarea_"+inx+"' style='width: 90%; ' name='{{el.cap1}}-Reason_"+type+"__0___field{{$index}}_reason' class='reason_ta' rows='3'></textarea></div></span></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Smiley Rating <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp1 opt_s3' style='display: block'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px' ng-model='opt.val'>&nbsp;&nbsp;<label class='label_check'><div class='label_div' style='background: #fff'>Show Textfield</div><input type='checkbox' ng-model='opt.show_textfield'></label><input type='text' ng-model='opt.textfield' style='width: auto'><span class='value_rating'>Value: {{$index+1}}</span></span><br><span class='sp3'><label for='ocolor{{$index}}'>Color: <input class='cpicker' id='ocolor{{$index}}' ng-model='el.ocolor'></label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div><div class='opt_cl'><span class='opt_head'>4. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='thumbs')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>select one</span></span><span class='input_cover'><span class='box_cover {{el.lines}}'><div style='margin-left: -5px'><label class='label_thumb thumb{{$index}}' ng-style='{color: el.ocolor, width: el.wid, fontSize: con[0].field_font}' data-reason='{{opt.textfield}}' ng-repeat='opt in option["+inx+"].Drop' for='thumb"+inx+"{{$index}}' data-toggle='tooltip' data-original-title='{{opt.val}}' id='thumb"+inx+"_{{$index}}'><input type='radio' class='label_thumb field_class show_{{opt.show_textfield}}' do_what='{{el.LAW}}' value='{{1-$index}}' id='thumb"+inx+"{{$index}}' name='{{el.cap1}}_"+type+"__{{el.req}}___field{{$parent.$index}}'><span class='opt_val' ng-style='{ color: el.ocolor, background: con[0].bg_image }'>{{opt.val}}</span></label></div><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Thumb Rating <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp1 opt_s3' style='display: block'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px' ng-model='opt.val'><span class='value_rating'> Value: {{1-$index}}</span></span><br><span class='sp3'><label for='ocolor{{$index}}'>Color: <input class='cpicker' id='ocolor{{$index}}' ng-model='el.ocolor'></label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div><div class='opt_cl'><span class='opt_head'>4. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='matrix2')
  {
    $scope.el_f = "<div style='position: relative' class='matrix_cover'><table class='matrix_table' ng-class='el.tick_type'><thead><td class='matrix_left_c' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix1}}</td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix2}}</td></thead><tbody><tr ng-style='{width: el.wid, color: el.ocolor}' ng-repeat='opt in option["+inx+"].Drop' id='matrix_"+inx+"_{{$index}}'><td class='matrix_label matrix_left_c' style='width: 50%'><span>{{opt.val}}</span></td><td class='matrix_cell' style='width: 25%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix1}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td class='matrix_cell' style='width: 25%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix2}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td style='background-color: #fff; padding: 0px'><div style='background-color: #fff'><span class='field{{$parent.$index}}{{$index}} valid_show'></span></div></td></tr></tbody></table><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span></div>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Choice Matrix <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp1'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Head 1: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix1'></span><span class='sp3'><label for='pcps{{$index}}'>Head 2: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix2'></span><span class='sp3'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp2'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp3 opt_s3'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px' ng-model='opt.val'></span><span class='sp3 opt_s3'><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+", "+'"matrix"'+")'><i class='icon-plus icon-white'></i></button></span><br><span class='sp2'><label class='label_radio tick_default'><input name='tick_type{{$index}}' type='radio' ng-model='el.tick_type' value='default'><div class='label_div' style='background: #fff'><span class='tick_default'></span></div></label><label class='label_radio tick_circled'><input name='tick_type{{$index}}' type='radio' checked='checked' ng-model='el.tick_type' value='circled'><div class='label_div' style='background: #fff'><span class='tick_circled'></span></div></label></span><span class='sp3'><label for='ocolor{{$index}}'>Color: <input class='cpicker' id='ocolor{{$index}}' ng-model='el.ocolor'></label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }

  if (type=='matrix3')
  {
    $scope.el_f = "<div style='position: relative' class='matrix_cover'><table class='matrix_table' ng-class='el.tick_type'><thead><td class='matrix_left_c' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix1}}</td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix2}}</td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix3}}</td></thead><tbody><tr ng-style='{width: el.wid, color: el.ocolor}' ng-repeat='opt in option["+inx+"].Drop' id='matrix_"+inx+"_{{$index}}'><td class='matrix_label matrix_left_c' style='width: 40%'><span>{{opt.val}}</span></td><td class='matrix_cell' style='width: 20%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix1}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td class='matrix_cell' style='width: 20%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix2}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td class='matrix_cell' style='width: 20%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix3}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td style='background-color: #fff; padding: 0px'><div style='background-color: #fff'><span class='field{{$parent.$index}}{{$index}} valid_show'></span></div></td></tr></tbody></table><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span></div>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Choice Matrix <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp1'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Head 1: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix1'></span><span class='sp3'><label for='pcps{{$index}}'>Head 2: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix2'></span><span class='sp3'><label for='pcps{{$index}}'>Head 3: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix3'></span><span class='sp3'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp3 opt_s3'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px' ng-model='opt.val'></span><span class='sp3 opt_s3'><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+", "+'"matrix"'+")'><i class='icon-plus icon-white'></i></button></span><br><span class='sp2'><label class='label_radio tick_default'><input name='tick_type{{$index}}' type='radio' ng-model='el.tick_type' value='default'><div class='label_div' style='background: #fff'><span class='tick_default'></span></div></label><label class='label_radio tick_circled'><input name='tick_type{{$index}}' type='radio' checked='checked' ng-model='el.tick_type' value='circled'><div class='label_div' style='background: #fff'><span class='tick_circled'></span></div></label></span><span class='sp3'><label for='ocolor{{$index}}'>Color: <input class='cpicker' id='ocolor{{$index}}' ng-model='el.ocolor'></label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }

  if (type=='matrix4')
  {
    $scope.el_f = "<div style='position: relative' class='matrix_cover'><table class='matrix_table' ng-class='el.tick_type'><thead><td class='matrix_left_c' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix1}}</td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix2}}</td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix3}}</td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix4}}</td></thead><tbody><tr ng-style='{width: el.wid, color: el.ocolor}' ng-repeat='opt in option["+inx+"].Drop' id='matrix_"+inx+"_{{$index}}'><td class='matrix_label matrix_left_c' style='width: 40%'><span>{{opt.val}}</span></td><td class='matrix_cell' style='width: 15%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix1}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td class='matrix_cell' style='width: 15%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix2}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td class='matrix_cell' style='width: 15%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix3}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td class='matrix_cell' style='width: 15%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix4}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td style='background-color: #fff; padding: 0px'><div style='background-color: #fff'><span class='field{{$parent.$index}}{{$index}} valid_show'></span></div></td></tr></tbody></table><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span></div>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Choice Matrix <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp1'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Head 1: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix1'></span><span class='sp3'><label for='pcps{{$index}}'>Head 2: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix2'></span><span class='sp3'><label for='pcps{{$index}}'>Head 3: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix3'></span><span class='sp3'><label for='pcps{{$index}}'>Head 4: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix4'></span><span class='sp3'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp1'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp3 opt_s3'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px' ng-model='opt.val'></span><span class='sp3 opt_s3'><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+", "+'"matrix"'+")'><i class='icon-plus icon-white'></i></button></span><br><span class='sp2'><label class='label_radio tick_default'><input name='tick_type{{$index}}' type='radio' ng-model='el.tick_type' value='default'><div class='label_div' style='background: #fff'><span class='tick_default'></span></div></label><label class='label_radio tick_circled'><input name='tick_type{{$index}}' type='radio' checked='checked' ng-model='el.tick_type' value='circled'><div class='label_div' style='background: #fff'><span class='tick_circled'></span></div></label></span><span class='sp3'><label for='ocolor{{$index}}'>Color: <input class='cpicker' id='ocolor{{$index}}' ng-model='el.ocolor'></label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }

  if (type=='matrix5')
  {
    $scope.el_f = "<div style='position: relative' class='matrix_cover'><table class='matrix_table' ng-class='el.tick_type'><thead><td class='matrix_left_c' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix1}}</td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix2}}</td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix3}}</td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix4}}</td><td class='matrix_label_2'  ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.matrix5}}</td></thead><tbody><tr ng-style='{width: el.wid, color: el.ocolor}' ng-repeat='opt in option["+inx+"].Drop' id='matrix_"+inx+"_{{$index}}'><td class='matrix_label matrix_left_c' style='width: 40%'><span>{{opt.val}}</span></td><td class='matrix_cell' style='width: 12%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix1}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td class='matrix_cell' style='width: 12%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix2}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td class='matrix_cell' style='width: 12%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix3}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td class='matrix_cell' style='width: 12%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix4}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td class='matrix_cell' style='width: 12%'><label class='label_tick cent' style='margin-right: 0px'><input type='radio' value='{{el.matrix5}}' class='radio' name='{{el.cap1}}-{{opt.val}}_matrix__{{el.req}}___field{{$parent.$index}}{{$index}}'></label></td><td style='background-color: #fff; padding: 0px'><div style='background-color: #fff'><span class='field{{$parent.$index}}{{$index}} valid_show'></span></div></td></tr></tbody></table><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span></div>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Choice Matrix <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp1'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Head 1: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix1'></span><span class='sp3'><label for='pcps{{$index}}'>Head 2: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix2'></span><span class='sp3'><label for='pcps{{$index}}'>Head 3: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix3'></span><span class='sp3'><label for='pcps{{$index}}'>Head 4: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix4'></span><span class='sp3'><label for='pcps{{$index}}'>Head 5: </label><input id='pcps{{$index}}' type='text' ng-model='el.matrix5'></span><span class='sp3'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp2'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop' class='sp3 opt_s3'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 115px' ng-model='opt.val'></span><span class='sp3 opt_s3'><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+", "+'"matrix"'+")'><i class='icon-plus icon-white'></i></button></span><br><span class='sp2'><label class='label_radio tick_default'><input name='tick_type{{$index}}' type='radio' ng-model='el.tick_type' value='default'><div class='label_div' style='background: #fff'><span class='tick_default'></span></div></label><label class='label_radio tick_circled'><input name='tick_type{{$index}}' type='radio' checked='checked' ng-model='el.tick_type' value='circled'><div class='label_div' style='background: #fff'><span class='tick_circled'></span></div></label></span><span class='sp3'><label for='ocolor{{$index}}'>Color: <input class='cpicker' id='ocolor{{$index}}' ng-model='el.ocolor'></label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }

  if (type=='date')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }' ></span></span><span class='input_cover text_cover'><span class='input-append' ng-style='{width: el.wid, fontSize: con[0].field_font}' place='{{el.cap1}}'><input type='text' id='date_input_{{$index}}' ng-style='{fontSize: con[0].field_font, color: con[0].input_color}' place='{{el.cap1}}' style='width: 100%' class='datepicker{{el.date}} field_class' do_what='{{el.LAW}}' lang='{{el.lang}}' format='{{el.dmy}}' dmin='{{el.sd}}' dmax='{{el.ed}}' days_r='{{el.days_restrict}}' name='{{el.cap1}}_"+type+"_date_{{el.req}}___field{{$index}}'><span class='add-on'><i class='icon-calendar'></i></span></span><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>DatePicker <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1'></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp3' style='width: 22%'><label for='lang{{$index}}'>Lang: </label><select id='lang{{$index}}' class='language_select' ng-model='el.lang'><option>en</option><option>bg</option><option>ca</option><option>cs</option><option>da</option><option>de</option><option>el</option><option>es</option><option>fi</option><option>fr</option><option>he</option><option>hr</option><option>hu</option><option>id</option><option>is</option><option>it</option><option>ja</option><option>kr</option><option>lt</option><option>lv</option><option>ms</option><option>nb</option><option>nl</option><option>pl</option><option>pt</option><option>pt-BR</option><option>ro</option><option>rs</option><option>rs-latin</option><option>ru</option><option>sk</option><option>sl</option><option>sv</option><option>sw</option><option>th</option><option>tr</option><option>uk</option><option>zh-CN</option><option>zh-TW</option></select></span><span class='sp3' style='width: 22%'><label for='dmy{{$index}}'>Format: </label><select id='dmy{{$index}}' class='language_select' ng-model='el.dmy'><option>dd-mm-yyyy</option><option>mm-dd-yyyy</option></select></span><span class='sp3' style='width: 22%'><label>Start Date</label><input type='text' placeholder='yyyy-mm-dd' ng-model='el.sd' class='date_restrict'></span><span class='sp3' style='width: 22%'><label>End Date</label><input type='text' placeholder='yyyy-mm-dd' ng-model='el.ed' class='date_restrict'></span><span class='sp1' style='font-size: 12px; line-height: 140%; color: #777; border-top: none'>You can restrict date input using the Start Date, and End Date fields. Enter a date range in the format yyyy-mm-dd. You can also specify a format like t-30 in the Start Date, to restrict the earliest date to 30 days prior to today ...</span><span class='sp1'><label>Disable Certain Days of the Week</label><input type='text' ng-model='el.days_restrict' class='date_restrict' style='width: 43%; margin-right: 17px'><span span style='font-size: 12px; line-height: 140%; color: #777; border-top: none'>e.g. 0,1,2 = disable Sunday, Monday, Tuesday</span></span><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div><div class='opt_cl'><span class='opt_head'>4. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }

  if (type=='time')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'></span></span><span class='input_cover text_cover'><span class='input-append bootstrap-timepicker' ng-style='{width: el.wid, fontSize: con[0].field_font}' place='{{el.cap1}}'><input type='text' data-show-meridian='true' ng-style='{fontSize: con[0].field_font, color: con[0].input_color}' place='{{el.cap1}}' class='timepicker field_class' do_what='{{el.LAW}}' name='{{el.cap1}}_"+type+"_time_{{el.req}}___field{{$index}}' style='width: 100%'><span class='add-on'><i class='icon-time'></i></span></span><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>TimePicker <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1'></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='time24')
  {
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'></span></span><span class='input_cover text_cover'><span class='input-append bootstrap-timepicker' ng-style='{width: el.wid, fontSize: con[0].field_font}' place='{{el.cap1}}'><input type='text' ng-style='{fontSize: con[0].field_font, color: con[0].input_color}' place='{{el.cap1}}' data-show-meridian='false' class='timepicker field_class' do_what='{{el.LAW}}' name='{{el.cap1}}_"+type+"_time_{{el.req}}___field{{$index}}' style='width: 100%'><span class='add-on'><i class='icon-time'></i></span></span><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>TimePicker <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1'></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }  

  if (type=='image')
  {
    $scope.el_f = "<div style='height: 1px'><span class='image_cap_cover ui-draggable {{con[0].cap_width}}' id='image{{$index}}' ng-style='{left: el.pleft, top: el.ptop}' style='height: 1px; display: block; width: 1px'><img src='{{el.image}}' ng-style='{width: el.wid, height: el.hei}' class='nform_image'></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Image <span class='head_label'>{{el.cap1}}</span></span></div>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp1'><input id='image_location' type='text' name='image_location' placeholder='Paste URL here' ng-model='el.image'/></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><span class='sp3'><label for='wid{{$index}}'>Height: </label><input id='hei{{$index}}' type='text' ng-model='el.hei' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><span class='sp3'><label for='image{{$index}}l'>Left: </label><input type='text' ng-model='el.pleft' id='image{{$index}}l'></span><span class='sp3'><label for='image{{$index}}t'>Top: </label><input type='text' ng-model='el.ptop' id='image{{$index}}t'></span><span class='sp3 settings_desc' style='margin-top: 0px; text-align: center'>You can also drag the image to adjust its position.</span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='submit')
  {
    $scope.el_f = "<button type='submit' class='submit_button nform_btn {{el.sub_th}}' ng-style='{backgroundColor: el.sco, fontSize: el.sfs,  left: el.lp,  marginTop: el.tp,  marginBottom: el.bp,  marginRight: el.rp,  height: el.spad1, width: el.spad2,  borderRadius: el.curve,  MozBorderRadius: el.curve,  WebkitBorderRadius: el.curve, fontFamily: el.sfamily, fontWeight: el.sbold, color: el.sbfco}'>{{el.cap1}}</button>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Submit Button <span class='head_label'>{{el.cap1}}</span></span></div>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='sconfig9'>Text</label><input id='sconfig9' type='text' ng-model='el.cap1'></span><span class='sp3'><label for='sconfig10'>Font Size</label><input id='sconfig10' type='number' min='1' ng-model='el.sfs' style='width: 100%'></span><span class='sp3' style='width: 145px'><label for='sbconfig9'>Color</label><input id='sbconfig9' class='cpicker' ng-model='el.sbfco'></span><span class='sp3'><label for='sconfig134'>Font Family</label><select id='sconfig134' ng-model='el.sfamily' style='height: 26px'><option></option><option>Arial</option><option>Arial Black</option><option>Courier New</option><option>Times New Roman</option><option>Trebuchet MS</option><option>Verdana</option></select></span><span class='sp3'><label>Font Weight:</label><label class='label_radio' for='sbold_1'><input id='sbold_1' type='radio' ng-model='el.sbold' value='bold' name='sbold_if'><div class='label_div' style='background: #fff'>Bold</div></label><label class='label_radio' for='sbold_2'><input id='sbold_2' type='radio' ng-model='el.sbold' value='normal' name='sbold_if'><div class='label_div' style='background: #fff'>Normal</div></label></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Styling</span><span class='sp2'><label>Style: </label><label class='label_radio'><input value='' type='radio' ng-model='el.sub_th'><div class='label_div' style='background: #fff'>Inset</div></label><label class='label_radio'><input value='boots' type='radio' ng-model='el.sub_th'><div class='label_div' style='background: #fff'>Flat</div></label></span><span class='sp3' style='width: 145px'><label for='sconfig9'>Button Color</label><input id='sconfig9' class='cpicker' ng-model='el.sco'></span><span class='sp3'><label for='sconfig1'>Width</label><input id='sconfig1' type='text' ng-model='el.spad2'></span><span class='sp3'><label for='sconfig2'>Height</label><input id='sconfig2' type='text' ng-model='el.spad1'></span><span class='sp3'><label for='sconfig16'>Curve</label><input id='sconfig16' type='number' min='0' ng-model='el.curve'></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='slider')
  {
    $scope.el_f = "<span class='cap_cover slider_cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>you can select more than one!</span></span><span class='input_cover slider_ic'><span class='{{el.lines}}'><div style='position: relative'><div ng-repeat='opt in option["+inx+"].Drop' class='slider_cover'><span class='slider_txt' ng-style='{color: con[0].slfc, fontSize: con[0].field_font}'>{{opt.val}}</span><span id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}_{{opt.sstep}}_val' class='slider_val'>0</span><input type='hidden' id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}_{{opt.sstep}}_val2' name='{{el.cap1}}-{{opt.val}}_"+type+"__{{el.req}}___field{{$parent.$index}}'><div class='slider' ng-style='{ width: el.wid }' id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}_{{opt.sstep}}' slider='{{opt.sty}}'></div></div><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span></div><span class='field{{$index}} valid_show'></span></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Slider Group <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><br><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 140px' ng-model='opt.val'>&nbsp;&nbsp;Min: <input class='del-inp' type='text' style='width: 50px' ng-model='opt.smin'>&nbsp;&nbsp;Max: <input class='del-inp' type='text' style='width: 50px' ng-model='opt.smax'>&nbsp;&nbsp;Step: <input class='del-inp' type='text' style='width: 50px' ng-model='opt.sstep'><br></span><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+")'><i class='icon-plus icon-white'></i></button></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='slider-range')
  {
    $scope.el_f = "<span class='cap_cover slider_cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>you can select more than one!</span></span><span class='input_cover slider_ic'><span class='{{el.lines}}'><div style='position: relative'><div ng-repeat='opt in option["+inx+"].Drop' class='slider_cover'><span class='slider_txt' ng-style='{color: con[0].slfc, fontSize: con[0].field_font}'>{{opt.val}}</span><span id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}_{{opt.sstep}}_val' class='slider_val' style='width: auto'>00 - 00</span><input type='hidden' id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}_{{opt.sstep}}_val2' name='{{el.cap1}}-{{opt.val}}_"+type+"__{{el.req}}___field{{$parent.$index}}'><div class='slider-range' ng-style='{ width: el.wid }' id='slider_{{$parent.$index}}_{{$index}}_{{opt.smin}}_{{opt.smax}}_{{opt.sstep}}' slider='{{opt.sty}}'></div></div><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span></div><span class='field{{$index}} valid_show'></span></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Slider Range Group <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid' ></span><br><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst' ></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Items</span><span ng-repeat='opt in option["+inx+"].Drop'><button class='btn btn-danger btn-mini del-btn2' ng-click='remOpt($index, "+inx+")'><i class='icon-remove icon-white'></i></button><input class='del-inp' type='text' style='width: 140px' ng-model='opt.val'>&nbsp;&nbsp;Min: <input class='del-inp' type='text' style='width: 50px' ng-model='opt.smin'>&nbsp;&nbsp;Max: <input class='del-inp' type='text' style='width: 50px' ng-model='opt.smax'>&nbsp;&nbsp;Step: <input class='del-inp' type='text' style='width: 50px' ng-model='opt.sstep'><br></span><button class='add_btn btn btn-primary' ng-click='addOpt("+inx+")'><i class='icon-plus icon-white'></i></button></div><div class='opt_cl'><span class='opt_head'>3. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='divider')
  {
    $scope.el_f = "<div class='divider' ng-style='{ borderTopWidth: el.divwid, borderTopColor: el.divcol, marginTop: el.divspa_divider_top, marginBottom: el.divspa_divider_bottom }' style='border-top-style: solid' style='margin-bottom: 10px'><span class='div_text' ng-style='{ marginTop: el.divtop }'><span class='div_text2' ng-style='{ marginLeft: el.divlef, fontSize: el.divfs, color: el.divfc, fontFamily: el.family, backgroundImage:con[0].bg_image}'>{{el.cap1}}</span></span></div><input type='hidden' name='divider_divider_divider' value='{{el.cap1}}'>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Divider</span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span><span class='sp1'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><span class='sp3'><label for='pcpm{{$index}}'>Text: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='lef{{$index}}'>Left Position: </label><input id='lef{{$index}}' type='text' ng-model='el.divlef' ></span><span class='sp3'><label for='top{{$index}}'>Bottom Position: </label><input id='top{{$index}}' type='text' ng-model='el.divtop' ></span><span class='sp3'><label for='col{{$index}}'>Divider Color: </label><input id='col{{$index}}' class='cpicker' ng-model='el.divcol' ></span><span class='sp3' style='width: 14.5%'><label for='spa{{$index}}'>Top: </label><input id='spa{{$index}}' type='text' ng-model='el.divspa_divider_top' ><br></span><span class='sp3' style='width: 14.5%'><label>Bottom: </label><input type='text' ng-model='el.divspa_divider_bottom' ><br></span><span class='sp3'><label for='wid{{$index}}'>Divider Thickness: </label><input id='wid{{$index}}' type='text' ng-model='el.divwid' ></span><span class='sp3'><label for='fs{{$index}}'>Font Size: </label><input id='fs{{$index}}' type='text' ng-model='el.divfs' ></span><span class='sp3'><label for='fc{{$index}}'>Font Color: </label><input id='fc{{$index}}' class='cpicker' ng-model='el.divfc' ></span><span class='sp3'><label for='family{{$index}}'>Font: </label><select id='family{{$index}}' ng-model='el.family' style='height: auto; padding: 5px'><option></option><option>Arial</option><option>Arial Black</option><option>Courier New</option><option>Times New Roman</option><option>Trebuchet MS</option><option>Verdana</option></select></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='custom')
  {
    $scope.el_f = "<span ng-style='{ paddingTop: el.divspa_in, paddingBottom: el.divspa_in, fontSize: el.divfs, color: el.divfc, fontFamily: el.family, background: el.custom_bg_color }' compile='el.cap1' style='display: block; position: relative; white-space: pre-line; line-height: 140%; padding-left: 6px; padding-right: 6px'></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Custom Text</span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp1'><textarea id='pcpm{{$index}}' type='text' ng-model='el.cap1' style='width: 100%' rows='4'></textarea></span><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span><span class='sp3'><label for='fs{{$index}}'>Font Size: </label><input id='fs{{$index}}' type='text' ng-model='el.divfs'></span><span class='sp3'><label for='fc{{$index}}'>Font Color: </label><input id='fc{{$index}}' class='cpicker' ng-model='el.divfc'></span><span class='sp3'><label for='family{{$index}}'>Font Family: </label><select id='family{{$index}}' ng-model='el.family' style='height: auto; padding: 5px'><option></option><option>Arial</option><option>Arial Black</option><option>Courier New</option><option>Times New Roman</option><option>Trebuchet MS</option><option>Verdana</option></select></span><span class='sp3'><label>Inner-Margin: </label><input type='text' ng-model='el.divspa_in'></span><span class='sp3'><label>Outer-Margin: </label><input type='text' ng-model='el.divspa'></span><span class='sp3'><label>Background</label><input class='cpicker' ng-model='el.custom_bg_color'></span><span class='sp1'><label class='label_check' style='margin-top: 10px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }
  if (type=='upload')
  {
    if ($scope.build.upload==1)
    {
      alert('You cannot have more than one file upload field.');
      return false;
    }
    else 
    {
      $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc}'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>enter your full name</span></span><span class='input_cover upload_input_cover'><span class='btn btn-success fileupload-cover'><i class='icon-arrow-up icon-white'></i> <span>{{el.uploadtext}}</span><input class='fileupload' type='file' data-url='' name='files[]' filetype='{{el.file_type}}' filetype_error='{{con[0].error_ftype}}' id='input_upload_{{$index}}'></span><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span><input type='hidden' class='upload_hidden field_class' do_what='{{el.LAW}}' name='{{el.cap1}}_"+type+"_file_{{el.req}}___field{{$index}}' value='0'><ul class='upload_ul'></ul></span>";
      $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>File Upload <span class='head_label'>{{el.cap1}}</span></span>";
      $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='cpm{{$index}}'>Label: </label><input id='cpm{{$index}}' type='text' ng-model='el.cap1'></span><span class='sp3'><label for='cps{{$index}}'>Sub Label: </label><input id='cps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='uploadtext{{$index}}'>Button: </label><input id='uploadtext{{$index}}' type='text' ng-model='el.uploadtext'></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><span class='sp3'><label class='label_check' style='margin-top: 20px'><input type='checkbox' ng-model='el.default' ng-true-value='is_hidden' ng-false-value=''><div class='label_div' style='background: #fff'>Hidden by Default</div></label></span><span class='sp1'><label for='ft{{$index}}'>File Types: </label><input id='ft{{$index}}' type='text' ng-model='el.file_type'><span class='settings_desc'>Enter file extensions, separated by a space, example 'jpeg png'. Leave empty to accept all files.</span></span><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span></div><div class='opt_cl'><span class='opt_head'>3. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
      $scope.captcha = 0;
      $scope.build.upload = 1;
      $scope.upload = 1;
    }
  }
  if (type=='captcha')
  {
    if ($scope.build.captcha==1)
    {
      alert('You cannot have more than one captcha field.');
      return false;
    }
    else 
    {
      $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}</span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'></span></span><span class='input_cover text_cover'><img ng-src='"+window.base+"/php/image.php?id="+window.ide+"&type={{el.cap_type}}' title='Click to refresh' class='c_image' style='display: inline' width='110px' height='30px'><input type='text' style='width: 97px; margin-left: 12px; display: inline' name='{{el.cap1}}_"+type+"_captcha_1___field{{$index}}' ng-style='{fontSize: con[0].field_font, color: con[0].input_color}' place='{{el.cap1}}'><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span>";
      $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Captcha (Spam Guard) <span class='head_label'>{{el.cap1}}</span></span>";
      $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='pcpm{{$index}}'>Label: </label><input id='pcpm{{$index}}' type='text' ng-model='el.cap1' ></span><span class='sp3'><label for='pcps{{$index}}'>Sub Label: </label><input id='pcps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><span class='sp1'><label>Type: </label><label class='label_radio'><input type='radio' ng-model='el.cap_type' value='text'><div class='label_div' style='background: #fff'>Text</div></label><label class='label_radio'><input type='radio' ng-model='el.cap_type' value='number'><div class='label_div' style='background: #fff'>Number</div></label></span><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div>";
      $scope.build.captcha = 1;
      $scope.captcha = 1;
      $scope.upload = 0;
    }
  }
  if (type=='pass')
  {       
    $scope.el_f = "<span class='cap_cover {{con[0].cap_width}}'><span class='cap1 {{con[0].subl}}' ng-style='{ fontSize: con[0].lfs, color: con[0].lfc }'>{{el.cap1}}<span class='show_{{el.req}}'>*</span></span><span class='cap2 {{con[0].subl}}' ng-bind='el.cap2' ng-style='{ fontSize: con[0].slfs, color: con[0].slfc }'>enter your full name</span></span><span class='input_cover text_cover'><input do_what='{{el.LAW}}' type='password' ng-style='{ width: el.wid }' name='{{el.cap1}}_"+type+"_{{el.valid}}_{{el.req}}_{{el.min}}_{{el.max}}_field{{$index}}' class='field_class'><span class='q_cover'><span class='inst ttip' ng-style='{ fontSize: con[0].ifs, color: con[0].lfc }' data-original-title='{{el.inst}}'><i class='icon-question-sign'></i></span></span><span class='field{{$index}} valid_show'></span></span>";
    $scope.el_b = "<span class='id_hold'>{{$index}}</span><span class='id_text'>Password Field <span class='head_label'>{{el.cap1}}</span></span>";
    $scope.el_b2 = "<div class='opt_cl'><span class='opt_head'>1. General</span><span class='sp3'><label for='cpm{{$index}}'>Label: </label><input id='cpm{{$index}}' type='text' ng-model='el.cap1'></span><span class='sp3'><label for='cps{{$index}}'>Sub Label: </label><input id='cps{{$index}}' type='text' ng-model='el.cap2'></span><span class='sp3'><label for='wid{{$index}}'>Width: </label><input id='wid{{$index}}' type='text' ng-model='el.wid'></span><span class='sp2'><label for='inst{{$index}}'>Instructions: </label><input id='inst{{$index}}' type='text' ng-model='el.inst'></span><br><span class='sp1'><label for='inline{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline{{$index}}_"+random+"' ng-model='el.inline' value='inline1'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 80px'></span></div><span class='layout_c1_text'>one column</span> </label><label for='inline2{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline2{{$index}}_"+random+"' ng-model='el.inline' value='inline2'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 32px'></span><span class='layout_c1' style='width: 32px; margin-left: 5px'></span></div><span class='layout_c1_text'>two column</span> </label><label for='inline3{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline3{{$index}}_"+random+"' ng-model='el.inline' value='inline3'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 25px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span><span class='layout_c1' style='width: 25px; margin-left: 5px'></span></div><span class='layout_c1_text'>three column</span> </label><label for='inline4{{$index}}_"+random+"' class='label_radio ax' style='margin-bottom: 25px; margin-top: 18px'><input type='radio' id='inline4{{$index}}_"+random+"' ng-model='el.inline' value='inline4'><div class='label_div' style='background: #fff'><span class='layout_c1' style='width: 21px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span><span class='layout_c1' style='width: 21px; margin-left: 5px'></span></div><span class='layout_c1_text'>four column</span> </label></span></div><div class='opt_cl'><span class='opt_head'>2. Validation</span><span class='sp1'><label>Compulsory Field? <span style='color: #888'>(whether or not hidden by default)</span></label> <label for='req1{{$index}}' class='label_radio'><input type='radio' id='req1{{$index}}' ng-model='el.req' value='1'><div class='label_div' style='background: #fff'>Yes</div> </label><label for='req2{{$index}}' class='label_radio'><input type='radio' id='req2{{$index}}' ng-model='el.req' value='0'><div class='label_div' style='background: #fff'>No</div> </label></span><br><span class='sp3'><label>Validation: </label><select ng-model='el.valid'><option value=''></option><option value='alphabets'>Alphabets Only</option><option value='integers'>Integers Only</option><option value='alpha'>Alpha-numeric Only</option><option value='email'>Email</option><option value='url'>URL</option></select></span><span class='sp3'><label for='min{{$index}}'>Min Characters: </label><input id='min{{$index}}' type='text' ng-model='el.min'></span><span class='sp3'><label for='max{{$index}}'>Max Characters: </label><input id='max{{$index}}' type='text' ng-model='el.max'></span></div><div class='opt_cl'><span class='opt_head'>3. Conditional Laws <a href='http://ncrafts.net/formcraft/docs/conditional-logic/' target='_blank' style='font-size: 12px' title='Opens in a new Window'>(documentation)</a></span><div ng-repeat='el2 in build[$index].CL' class='cl_div_cover'><div compile='el2.CL_html'></div></div><button style='width: 100%; height: 40px; margin-top: 15px' class='add_btn btn btn-primary' ng-click='addCL($index)'><i class='icon-plus icon-white'></i></button></div>";
    $scope.captcha = 0;
    $scope.upload = 0;
  }

  if (type=='matrix2' || type=='matrix3' || type=='matrix4' || type=='matrix5')
  {
    $scope.option.push(
    {
      Drop: [
      {"val": 'Service'}, 
      {"val": 'Quality'} 
      ]
    });
  }
  else if (type=='smiley')
  {
    $scope.option.push(
    {
      Drop: [
      {"val": 'Terrible', "show_textfield": "false", "textfield": "why?"}, 
      {"val": 'Could be better', "show_textfield": "false", "textfield": "why?"}, 
      {"val": 'Just okay', "show_textfield": "false", "textfield": "why?"}, 
      {"val": 'I like it', "show_textfield": "false", "textfield": "why?"}, 
      {"val": 'Awesome!', "show_textfield": "false", "textfield": "why?"} 
      ]
    });
  }
  else if (type=='stars')
  {
    $scope.option.push(
    {
      Drop: [
      {"val": '1/5', "show_textfield": "false", "textfield": "why?"}, 
      {"val": '2/5', "show_textfield": "false", "textfield": "why?"}, 
      {"val": '3/5', "show_textfield": "false", "textfield": "why?"}, 
      {"val": '4/5', "show_textfield": "false", "textfield": "why?"}, 
      {"val": '5/5', "show_textfield": "false", "textfield": "why?"} 
      ]
    });
  }
  else if (type=='thumbs')
  {
    $scope.option.push(
    {
      Drop: [
      {"val": 'Awesome', "show_textfield": "false", "textfield": "why?"}, 
      {"val": 'Terrible', "show_textfield": "false", "textfield": "why?"}
      ]
    });
  }
  else if (type=='slider' || type=='slider-range')
  {
    $scope.option.push(
    {
      Drop: [
      {"val": 'Range One', "smin": "10", "smax": "80"}, 
      {"val": 'Range Two', "smin": "10", "smax": "80"}
      ]
    });
  }
  else if (type=='dropdown')
  {
    $scope.option.push(
    {
      Drop: [
      {"val": ''}, 
      {"val": 'Option A'}, 
      {"val": 'Option B'}, 
      {"val": 'Option C'}, 
      {"val": 'Option D'}, 
      ]
    });
  }
  else
  {
    $scope.option.push(
    {
      Drop: [
      {"val": 'Option A'}, 
      {"val": 'Option B'}, 
      {"val": 'Option C'}, 
      {"val": 'Option D'}, 
      {"val": 'Option E'} 
      ]
    });
  }


  $scope.build.push({
    el_f:$scope.el_f,
    el_b:$scope.el_b,
    el_b2:$scope.el_b2,
    captcha:$scope.captcha,
    upload:$scope.upload,
    CL: [],
    LAW: []
  });


  var inx = $scope.build.length-1;

  $scope.build.le = $scope.build.length;
  var temp_length = $scope.build.le-1;

  add_field_call();


  setTimeout("add_sliders()", 200);
  setTimeout("update_date()", 200);




    // Default for Fields
    if (type!='submit')
    {
      if($scope.build[inx].isDisabled==undefined)
      {
        $scope.build[inx].isDisabled = false;
      }
    }
    else
    {
      if($scope.build[inx].isDisabled==undefined)
      {
        $scope.build[inx].isDisabled = true;
      }
    }

    // Specifics
    switch (type)
    {

      case 'text':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Name';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'full name';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '80%';
      }
      break;

      case 'email':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Email';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'a valid email address';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '71.5%';
      }
      break;

      case 'para':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Comments';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'something more';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '80%';
      }
      break;

      case 'dropdown':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Country';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'select your country';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '80%';
      }
      break;

      case 'check':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Hobbies';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'select one or more';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '35%';
      }
      if($scope.build[inx].tick_type==undefined)
      {
        $scope.build[inx].tick_type = 'default';
      }
      break;

      case 'radio':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Profession';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'select just one';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '35%';
      }
      if($scope.build[inx].tick_type==undefined)
      {
        $scope.build[inx].tick_type = 'default';
      }

      break;

      case 'stars':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Service';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'rate our service';
      }
      break;

      case 'smiley':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Food';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'how good was the food?';
      }
      break;

      case 'thumbs':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Like it?';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'be frank!';
      }
      if($scope.build[inx].lines==undefined)
      {
        $scope.build[inx].lines = 'lines';
      }
      break;

      case 'matrix2':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Ratings';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'how good was the food?';
      }
      if($scope.build[inx].matrix1==undefined)
      {
        $scope.build[inx].matrix1 = 'Poor';
      }
      if($scope.build[inx].matrix2==undefined)
      {
        $scope.build[inx].matrix2 = 'Decent';
      }
      if($scope.build[inx].tick_type==undefined)
      {
        $scope.build[inx].tick_type = 'default';
      }

      case 'matrix3':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Ratings';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'how good was the food?';
      }
      if($scope.build[inx].matrix1==undefined)
      {
        $scope.build[inx].matrix1 = 'Poor';
      }
      if($scope.build[inx].matrix2==undefined)
      {
        $scope.build[inx].matrix2 = 'Decent';
      }
      if($scope.build[inx].matrix3==undefined)
      {
        $scope.build[inx].matrix3 = 'Decent';
      }
      if($scope.build[inx].tick_type==undefined)
      {
        $scope.build[inx].tick_type = 'default';
      }

      case 'matrix4':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Ratings';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'how good was the food?';
      }
      if($scope.build[inx].matrix1==undefined)
      {
        $scope.build[inx].matrix1 = 'Poor';
      }
      if($scope.build[inx].matrix2==undefined)
      {
        $scope.build[inx].matrix2 = 'Decent';
      }
      if($scope.build[inx].matrix3==undefined)
      {
        $scope.build[inx].matrix3 = 'Good';
      }
      if($scope.build[inx].matrix4==undefined)
      {
        $scope.build[inx].matrix4 = 'Excellent';
      }
      if($scope.build[inx].tick_type==undefined)
      {
        $scope.build[inx].tick_type = 'default';
      }

      case 'matrix5':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Ratings';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'how good was the food?';
      }
      if($scope.build[inx].matrix1==undefined)
      {
        $scope.build[inx].matrix1 = 'Poor';
      }
      if($scope.build[inx].matrix2==undefined)
      {
        $scope.build[inx].matrix2 = 'Decent';
      }
      if($scope.build[inx].matrix3==undefined)
      {
        $scope.build[inx].matrix3 = 'Good';
      }
      if($scope.build[inx].matrix4==undefined)
      {
        $scope.build[inx].matrix4 = 'Excellent';
      }
      if($scope.build[inx].matrix5==undefined)
      {
        $scope.build[inx].matrix5 = 'Godlike';
      }
      if($scope.build[inx].tick_type==undefined)
      {
        $scope.build[inx].tick_type = 'default';
      }

      break;

      case 'date':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Date';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'make a booking';
      }
      if($scope.build[inx].date==undefined)
      {
        $scope.build[inx].date = 'mdy';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '71.5%';
      }
      if($scope.build[inx].dmy==undefined)
      {
        $scope.build[inx].dmy = 'mm-dd-yyyy';
      }
      if($scope.build[inx].lang==undefined)
      {
        $scope.build[inx].lang = 'en';
      }
      break;

      case 'time': case 'time24':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Time';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = "let's meet";
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '71.5%';
      }
      break;

      case 'slider':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Slider';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'drag it';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '40%';
      }
      break;

      case 'slider-range':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Budget';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'how much can you spend';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '35%';
      }
      break;

      case 'divider':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Group';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '30%';
      }
      if($scope.build[inx].divwid==undefined)
      {
        $scope.build[inx].divwid = '1px';
      }
      if($scope.build[inx].divtop==undefined)
      {
        $scope.build[inx].divtop = '-10px';
      }
      if($scope.build[inx].divlef==undefined)
      {
        $scope.build[inx].divlef = '50px';
      }
      if($scope.build[inx].divfs==undefined)
      {
        $scope.build[inx].divfs = '14px';
      }
      if($scope.build[inx].divfc==undefined)
      {
        $scope.build[inx].divfc = '#666';
      }
      if($scope.build[inx].divspa==undefined)
      {
        $scope.build[inx].divspa = '20px';
      }
      if($scope.build[inx].divspa_divider_top==undefined)
      {
        $scope.build[inx].divspa_divider_top = '20px';
      }
      if($scope.build[inx].divspa_divider_bottom==undefined)
      {
        $scope.build[inx].divspa_divider_bottom = '10px';
      }
      if($scope.build[inx].divcol==undefined)
      {
        $scope.build[inx].divcol = '#CCC';
      }

      break;

      case 'custom':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'You can use this to write comments in the form.<br><em><strong>You can even use HTML!</strong></em>';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '40%';
      }
      if($scope.build[inx].divspa==undefined)
      {
        $scope.build[inx].divspa = '20px';
      }
      if($scope.build[inx].divfs==undefined)
      {
        $scope.build[inx].divfs = '14px';
      }
      if($scope.build[inx].divfc==undefined)
      {
        $scope.build[inx].divfc = '#666';
      }

      break;

      case 'upload':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Files';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'upload files here';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '80%';
      }
      if($scope.build[inx].uploadtext==undefined)
      {
        $scope.build[inx].uploadtext = 'Upload';
      }
      break;

      case 'captcha':
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Captcha';
      }
      if($scope.build[inx].cap2==undefined)
      {
        $scope.build[inx].cap2 = 'copy the words';
      }
      if($scope.build[inx].wid==undefined)
      {
        $scope.build[inx].wid = '80%';
      }
      if($scope.build[inx].cap_st==undefined)
      {
        $scope.build[inx].cap_st = 'one';
      }
      if($scope.build[inx].cap_stf==undefined)
      {
        $scope.build[inx].cap_stf = 'font';
      }
      if($scope.build[inx].cap_type==undefined)
      {
        $scope.build[inx].cap_type = 'text';
      }
      break;

      case 'hidden':
      if($scope.build[inx].li_class==undefined)
      {
        $scope.build[inx].li_class = 'hidden_li';
      }
      break;

      case 'image':
      if($scope.build[inx].li_class==undefined)
      {
        $scope.build[inx].li_class = 'hidden_li';
      }
      if($scope.build[inx].image==undefined)
      {
        $scope.build[inx].image = 'http://placehold.it/100x50&text=image';
      }
      break;

      case 'submit':
      if($scope.build[inx].sub_th==undefined)
      {
        $scope.build[inx].sub_th = 'boots';
      }
      if($scope.build[inx].sco==undefined)
      {
        $scope.build[inx].sco = '#ddd';
      }
      if($scope.build[inx].sfs==undefined)
      {
        $scope.build[inx].sfs = 15;
      }
      if($scope.build[inx].spad1==undefined)
      {
        $scope.build[inx].spad1 = '42px';
      }
      if($scope.build[inx].spad2==undefined)
      {
        $scope.build[inx].spad2 = '100px';
      }
      if($scope.build[inx].curve==undefined)
      {
        $scope.build[inx].curve = 4;
      }
      if($scope.build[inx].sbold==undefined)
      {
        $scope.build[inx].sbold = 'normal';
      }
      if($scope.build[inx].cap1==undefined)
      {
        $scope.build[inx].cap1 = 'Submit';
      }
      break;

    }



    // Default for All Field Types

    if($scope.build[inx].req==undefined)
    {
      $scope.build[inx].req = '0';
    }
    if($scope.build[inx].inline==undefined)
    {
      $scope.build[inx].inline = 'inline1';
    }

    if($scope.build[inx].cs==undefined)
    {
      $scope.build[inx].cs = 'fixed';
    }

    if($scope.build[inx].min==undefined)
    {
      $scope.build[inx].min = '0';
    }
    if($scope.build[inx].max==undefined)
    {
      $scope.build[inx].max = '300';
    }



    $scope.build.le = $scope.build.length;
    setTimeout("add_field_call()", 500);

  };

  if ($scope.is_new)
  {
    $scope.addEl('submit');
  }

  setTimeout("add_field_call()", 500);

}



function add_field_call()
{

  if (jQuery('.cpicker').length)
  {
    jQuery('.cpicker').spectrum({
      showInput: true,
      showAlpha: true,
      clickoutFiresChange: true,
      preferredFormat: 'rgb',
      showButtons: false,
      change: function(color){
        jQuery(this).trigger('input');
      },
      move: function(color){
        jQuery(this).trigger('input');
      }
    }); 
  }

  jQuery( ".image_cap_cover" ).draggable({ 
    containment: ".nform",
    scroll: false,
    drag: function(event, ui) {
      var id = jQuery(this).attr('id');
      jQuery("#"+id+"l").val(ui.position.left+'px');
      jQuery("#"+id+"t").val(ui.position.top+'px');

      jQuery("#"+id+"l").trigger('input');
      jQuery("#"+id+"t").trigger('input');
    }
  });


  if (jQuery('.cpicker2').length)
  {
    jQuery('.cpicker2').spectrum({
      showInput: true,
      showAlpha: true,
      clickoutFiresChange: true,
      preferredFormat: 'rgb',
      showButtons: false,
      change: function(color){
        jQuery(this).trigger('input');
      },
      move: function(color){
        jQuery(this).trigger('input');
      }
    });
  }

};;;;