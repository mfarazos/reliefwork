
function SendDataByAjax(ctr_url, form_data, waiting_element, is_result_required, result_element, msg_element, msg_element_err)
{
    var result = null;
    //
    $(waiting_element).show();
    $.ajax({
        ///
        type: "POST",
		data: form_data,
		url: ctr_url,
		dataType: "json",
    	success: function(response){
            $(waiting_element).hide();
            result = JSON.parse(response);
            //result = response;

            
            if(is_result_required){
                $(result_element).html(result);

            }
            if(result == true)
            {
                $(msg_element).children('div').html("Successful");
                $(msg_element).show();
                $(msg_element).fadeIn('slow', function () {
                    $(this).delay(900).fadeOut(800);				  
                });
            }
            else            
            {
                $(msg_element_err).children('div').html(result);
                $(msg_element_err).show();
                $(msg_element_err).fadeIn('slow', function () {
                    $(this).delay(1500).fadeOut(1600);				  
                });
            }
    	}, //success
        error: function(xhr)
        {
            $(waiting_element).hide();
            $(msg_element_err).children('div').html("An error occured: " + xhr.status + " " + xhr.statusText + "<br/>" + xhr.responseText);
            $(msg_element_err).show();
            $(msg_element_err).fadeIn('slow', function () {
                $(this).delay(1400).fadeOut(1600);				  
            });
        }
        ///
    });//$.ajax
    //
    
} //SendDataByAjax


function SendDataByAjax2(ctr_url, form_data, waiting_element, is_result_required, result_element, msg_element, msg_element_err , output)
{
    var result = [];
    var s_result = "";
    var e_result = "";
    $(waiting_element).show();
    $.ajax({
        ///
        type: "POST",
		data: form_data,
		url: ctr_url,
		dataType: "json",
    	success: function(response)
        {
            $(waiting_element).hide();
            result = JSON.parse(response);

            s_result = "{";
            s_result += '"res":true,';
            s_result += '"msg":"'+ response + '"';
            s_result += "}";

            if(is_result_required){
                $(result_element).html(result);

            }
            if(result == true)
            {
                $(msg_element).children('div').html("Successful");
                $(msg_element).show();
                $(msg_element).fadeIn('slow', function () {
                    $(this).delay(900).fadeOut(800);
                });
            }
            else
            {
                $(msg_element_err).children('div').html(result);
                $(msg_element_err).show();
                $(msg_element_err).fadeIn('slow', function () {
                    $(this).delay(1500).fadeOut(1600);
                });
            }
            output(s_result);
           
    	}, //success
        error: function(xhr)
        {            
            err_msg = "An error occured: " + xhr.status + " " + xhr.statusText + "<br />" + xhr.responseText;
            
            //alert(err_msg);
            
            e_result = "{";
            e_result += '"res":false,';
            e_result += '"msg":"'+ err_msg + '"';
            e_result += "}";
            
            //result.push(e_result);
            
            //alert(result[0]);
            $(waiting_element).hide();
            $(msg_element_err).children('div').html("An error occured: " + xhr.status + " " + xhr.statusText + "<br/>" + xhr.responseText);
            $(msg_element_err).show();
            $(msg_element_err).fadeIn('slow', function () {
                $(this).delay(1400).fadeOut(1600);
            });
            
            output(e_result);           
           
        } // error
        ///
    });//$.ajax
    //
    
} //SendDataByAjax

function SendDataByAjax3(ctr_url, form_data, output)
{
    var s_result = "";
    var e_result = "";
    $.ajax({
        ///
        type: "POST",
		data: form_data,
		url: ctr_url,
		dataType: "json",
    	success: function(response)
        {
            s_result = "{";
            s_result += '"res":true,';
            s_result += '"msg":"'+ response.toString() + '"';
            s_result += "}";
            output(s_result);
           
    	}, //success
        error: function(xhr)
        {            
            err_msg = "An error occured: " + xhr.responseText.trim();
            
            e_result = "{";
            e_result += '"res":false,';
            e_result += '"msg":"'+ err_msg + '",';
            e_result += '"status":'+ xhr.status.toString();
            e_result += "}";
            output(e_result);           
           
        } // error
        ///
    });//$.ajax
    //
    
} //SendDataByAjax

function check_permition(ctr_url, form_data, output)
{
    var result = null;

    $.ajax({
        ///
        type: "POST",
        data: form_data,
        url: ctr_url,
        dataType: "json",
        success: function(response){

            result = JSON.parse(response);

            if(result == true)
            {
                output(result);
            }
            else
            {
                output(result);
            }
        }, //success
        error: function(xhr)
        {
            output(xhr);
        }
        ///
    });//$.ajax
    //

} //check_permition

