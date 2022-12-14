import $ from 'jquery'
$(document).on('turbolinks:load', function () {
  // Side Menu Hide Show JS
  $(".burger-menu").on('click', function () {
    $(".burger-menu").toggleClass("toggle-menu");
    // $(".navbar-brand").toggleClass("navbar-logo");
    $(".sidemenu-area").toggleClass("sidemenu-toggle");
    $(".sidemenu").toggleClass("hide-nav-title");
    $(".main-content").toggleClass("hide-sidemenu");
  });

  window.currently_working = function (event) {
    if ($("#user_personal_detail_attributes_work_details_attributes_" + event.currentTarget.id.split('_')[7] + "_currently_working").prop('checked') == true) {
      $("#user_personal_detail_attributes_work_details_attributes_" + event.currentTarget.id.split('_')[7] + "_to").closest('.form-group').addClass('d-none');
    }
    else {
      $("#user_personal_detail_attributes_work_details_attributes_" + event.currentTarget.id.split('_')[7] + "_to").closest('.form-group').removeClass('d-none');
    }
  }

  // Burger menu click show toggle x class
  $(".burger-menu").on('click', function () {
    $(".burger-menu").toggleClass("x");
  });

  // Feather Icon Js
  feather.replace();

  // Tooltip JS
  $('[data-toggle="tooltip"]').tooltip();

  // Gallery Viewer JS
  var console = window.console || {
    log: function () { }
  };
  var $images = $('.gallery-content');
  var $toggles = $('.gallery-toggles');
  var $buttons = $('.gallery-buttons');
  var options = {
    // inline: true,
    url: 'data-original',
    ready: function (e) {
      console.log(e.type);
    },
    show: function (e) {
      console.log(e.type);
    },
    shown: function (e) {
      console.log(e.type);
    },
    hide: function (e) {
      console.log(e.type);
    },
    hidden: function (e) {
      console.log(e.type);
    },
    view: function (e) {
      console.log(e.type);
    },
    viewed: function (e) {
      console.log(e.type);
    }
  };

  function toggleButtons(mode) {
    if (/modal|inline|none/.test(mode)) {
      $buttons
        .find('button[data-enable]')
        .prop('disabled', true)
        .filter('[data-enable*="' + mode + '"]')
        .prop('disabled', false);
    }
  }
  $images.on({
    ready: function (e) {
      console.log(e.type);
    },
    show: function (e) {
      console.log(e.type);
    },
    shown: function (e) {
      console.log(e.type);
    },
    hide: function (e) {
      console.log(e.type);
    },
    hidden: function (e) {
      console.log(e.type);
    },
    view: function (e) {
      console.log(e.type);
    },
    viewed: function (e) {
      console.log(e.type);
    }
  }).viewer(options);
  toggleButtons(options.inline ? 'inline' : 'modal');
  $toggles.on('change', 'input', function () {
    var $input = $(this);
    var name = $input.attr('name');
    options[name] = name === 'inline' ? $input.data('value') : $input.prop('checked');
    $images.viewer('destroy').viewer(options);
    toggleButtons(options.inline ? 'inline' : 'modal');
  });
  $buttons.on('click', 'button', function () {
    var data = $(this).data();
    var args = data.arguments || [];
    if (data.method) {
      if (data.target) {
        $images.viewer(data.method, $(data.target).val());
      } else {
        $images.viewer(data.method, args[0], args[1]);
      }
      switch (data.method) {
        case 'scaleX':
        case 'scaleY':
          args[0] = -args[0];
          break;
        case 'destroy':
          toggleButtons('none');
          break;
      }
    }
  });

  // FAQ Accordion Js
  $('.accordion').find('.accordion-title').on('click', function () {
    // Adds Active Class
    $(this).toggleClass('active');
    // Expand or Collapse This Panel
    $(this).next().slideToggle('fast');
    // Hide The Other Panels
    // $('.accordion-content').not($(this).next()).slideUp('fast');
    // Removes Active Class From Other Titles
    // $('.accordion-title').not($(this)).removeClass('active');
  });
  // Page Per User
  $('#change_per_page').on('change', function () {
    $('#per_page_submit').trigger('click')
  })
  $('#orders_per_page').on('change', function () {
    $('.product-mapping-request').trigger('click')
  })

  $('#customSwitchAllForReady , .update-selected-export').on('click', function () {
    var switches = $('.orders-switch');
    if ($(this).hasClass('update-selected-export')){
      $(this).parent().prop("checked", this.checked)
    }
    else{
      switches.prop("checked", this.checked);
    }
    var selected = []
    var unselected = []
    var elem = $(this)
    switches.each(function () {
      if (this.checked) {
        selected.push(this.id)
      }
      else {
        unselected.push(this.id)
      }
    })
    $.ajax({
      url: '/order_dispatches/bulk_update_selected',
      type: 'GET',
      data: { 'selected': selected, 'unselected': unselected },
      success: function (response) {
        if (response.result) {
          if (!elem.hasClass('update-selected-export')){
            // $('.jquery-selected-alert').html('All objects updated successfully')
            // $('.jquery-selected-alert').addClass('bg-success').removeClass('d-none').removeClass('bg-danger')
            // $(".jquery-selected-alert").fadeTo(2000, 500).slideUp(500, function () {
            //   $(".jquery-selected-alert").slideUp(500);
            // });
          }
        }
      }
    })
  })

  $('#customSwitchAll').on('click', function () {
    var switches = $('input[name="orders-switch"]');
    switches.prop("checked", !switches.prop("checked"));
    var selected = []
    var unselected = []
    var elem = $(this)
    switches.each(function () {
      if (this.checked) {
        selected.push(this.id)
      }
      else {
        unselected.push(this.id)
      }
    })
    $.ajax({
      url: '/order_dispatches/bulk_update_selected',
      type: 'GET',
      data: { 'selected': selected, 'unselected': unselected },
      success: function (response) {
        if (response.result) {
          if (!elem.hasClass('update-selected-export')){
            // $('.jquery-selected-alert').html('All objects updated successfully')
            // $('.jquery-selected-alert').addClass('bg-success').removeClass('d-none').removeClass('bg-danger')
            // $(".jquery-selected-alert").fadeTo(2000, 500).slideUp(500, function () {
            //   $(".jquery-selected-alert").slideUp(500);
            // });
          }
        }
      }
    })
  })

  $('.replacement-order').on('click', function (){
    var product_id = $('.product-id').val()
    var quantity = $('.quantity').val()
    $.ajax({
      url: '/order_dispatches/replacement_order_confirm',
      data: { 'product_id': product_id, 'quantity': quantity },
      type: 'GET',
      success: function (response) {
        if (response.message != 'nil' ) {
          $('#replacement-alert-modal').modal('show')
        }
        else {
          $('#new_channel_order').submit()
        }
      }
    })
  }
  )

  $('.submit-replacement-order-modal').on('click', function() {
    $('#new_channel_order').submit()
  })


  $('#customSwitchAllForUnmapped').on('click', function () {
    var switches = $('input[name="orders-switch1"]');
    switches.prop("checked", !switches.prop("checked"));
    var selected = []
    var unselected = []
    var elem = $(this)
    switches.each(function () {
      if (this.checked) {
        selected.push(this.id)
      }
      else {
        unselected.push(this.id)
      }
    })
    $.ajax({
      url: '/order_dispatches/bulk_update_selected',
      type: 'GET',
      data: { 'selected': selected, 'unselected': unselected },
      success: function (response) {
        if (response.result) {
          if (!elem.hasClass('update-selected-export')){
            // $('.jquery-selected-alert').html('All objects updated successfully')
            // $('.jquery-selected-alert').addClass('bg-success').removeClass('d-none').removeClass('bg-danger')
            // $(".jquery-selected-alert").fadeTo(2000, 500).slideUp(500, function () {
            //   $(".jquery-selected-alert").slideUp(500);
            // });
          }
        }
      }
    })
  })

  $('.customSwitch').on('click', function () {
    var value = this.checked
    var order_id = this.id

    $.ajax({
      url: '/order_dispatches/update_selected',
      type: "GET",
      data: { 'selected': value, 'order_id': order_id },
      success: function (response) {
        // if (response.result) {
        //   $('.jquery-selected-alert').html('Object updated successfully')
        //   $('.jquery-selected-alert').addClass('bg-success').removeClass('d-none').removeClass('bg-danger')
        //   $(".jquery-selected-alert").fadeTo(2000, 500).slideUp(500, function () {
        //     $(".jquery-selected-alert").slideUp(500);
        //   });
        // }
        // else {
        //   $('.jquery-selected-alert').html('Object cannot be updated! ' + response.errors[0])
        //   $('.jquery-selected-alert').addClass('bg-danger').removeClass('d-none')
        //   $('.jquery-selected-alert').alert('show')
        //   $(".jquery-selected-alert").fadeTo(2000, 500).slideUp(500, function () {
        //     $(".jquery-selected-alert").slideUp(500);
        //   });
        // }
      }
    })
  })

  $('.import-btn').on('click', function () {
    $('.import-file').trigger('click')
    $('.import-file').on('change', function () {
      $('.import-submit').trigger('click')
    })
  })

  $('.import-supplier-btn').on('click', function () {
    $('.import-supplier-file').trigger('click')
    $('.import-supplier-file').on('change', function () {
      $('.import-supplier-submit').trigger('click')
    })
  })

  $('.import-supplier-location-btn').on('click', function () {
    $('.import-supplier-location-file').trigger('click')
    $('.import-supplier-location-file').on('change', function () {
      $('.import-supplier-locations-submit').trigger('click')
    })
  })

  $('.select-all-checkbox').on("click", function () {
    var cbxs = $('input[name="object_ids[]"]');
    cbxs.prop("checked", !cbxs.prop("checked"));
  });

  $('.bulk-delete-objects').on('click', function () {
    $('.bulk-method-delete-objects').trigger('click')
  })

  $('.courier-value').on('change', function () {
  })

  $('.create_service_rule_button').on('click', function () {
    $('.bulk-method-order-dispatch').trigger('click')
  })

  $('#inventory_export_csv').on('click', function () {
    $('#view_reports').trigger('click')
  })

  $("#filter-reports").click(function(event){
    event.preventDefault();
    $('#view_reports').removeAttr('disabled');
    $('#view_report').removeAttr('disabled')
  });

  $("#inventory_export_csv").click(function(event){
    event.preventDefault();
    $('#view_reports').removeAttr('disabled');
    $('#view_report').removeAttr('disabled')
  });

  $('#export_mapping_table_name').on('change', function () {
    var table = $("#export_mapping_table_name").val()
    $.ajax({
      url: '/table_name',
      type: 'GET',
      data: { 'table_name': table },
      success: function (response) {
        $('.check-boxes').html('')
        $.each(response, function (index, val) {
          $('.check-boxes').append('<div class= "col-3">' + '<input type="checkbox" name="' + val + '" >' + '<label for="' + val + '"> ' + val + ' </label>' + '</br>' + '</div>')
        });
      }
    })
  })

  $('#extra_field_name_field_type').on('change', function () {
    var field_name = $("#extra_field_name_field_type").val()
    if (field_name === 'Select') {
      $('.add-association-button').removeClass('d-none')
    } else {
      $('.add-association-button').addClass('d-none')
    }
  })

  $("tr[data-link]").click(function () {
    window.location = $(this).data("link")
  })

  $("td[data-link]").click(function () {
    window.location = $(this).data("link")
  })

  $('.new-service-rule-modal').on('click', function () {
    var courier = this.dataset.courier
    var service = this.dataset.service
    $.ajax({
      url: '/mail_service_rules/search_courier_services',
      data: { 'courier_id': courier },
      type: "GET",
      dataType: "json",
      success: function (response) {
        $("#mail_service_rule_service_id").html('')
        if (response == null) {
          $("#mail_service_rule_service_id").append('<option>-- Please select courier first --</option>')
        }
        else {
          $("#mail_service_rule_service_id").append('<option>-- Select One --</option>')
          for (var i = 0; i < response.length; i++) {
            $("#mail_service_rule_service_id").append('<option value="' + response[i]["id"] + '">' + response[i]["name"] + '</option>');
          }
          $('#mail_service_rule_service_id').val(service)
        }
      }
    })
    $('#mail_service_rule_courier_id').val(courier)
  })

  $('#order_batch_print_packing_list').on('click', function () {
    var option = this.checked
    $('#order_batch_print_packing_list_option').prop('disabled', !option)
    if (option) {
      $($('#order_batch_print_packing_list_option').closest('div')).removeClass('d-none')
    }
    else {
      $($('#order_batch_print_packing_list_option').closest('div')).addClass('d-none')
    }
  })

  $('.one-click-dispatch').on('click', function () {
    var object_ids = $('input[name="object_ids[]"]:checked')
    var order_ids = object_ids.map(function (i, e) { return e.value }).toArray();
    var count = 0
    object_ids.map(function (i, e) { return count = count + parseInt(e.dataset.item) })
    var export_ids = object_ids.map(function (i, e) { return e.dataset.export }).toArray();
    var same_export = export_ids.every((val, i, arr) => val === arr[0])
    var rule = object_ids.map(function (i, e) { return e.dataset.courier }).toArray();
    var same_rule = rule.every((val, i, arr) => val === arr[0]) && rule[0] == 'Manual Dispatch'
    var allocated = object_ids.map(function (i, e) { return e.dataset.allocate }).toArray();
    var order_status = object_ids.map(function (i, e) { return e.dataset.status }).toArray();

    if ($.inArray('In Progress', order_status) > -1) {
      if (confirm('One of your order is already in progress. Would you like continue?')) {
      } else {
        return
      }
    }
    if ($.inArray('true', allocated) > -1) {
      $('.jquery-selected-alert').html('Please allocate order first')
      $('.jquery-selected-alert').addClass('bg-danger').removeClass('d-none').removeClass('bg-success')
      $(".jquery-selected-alert").fadeTo(4000, 500).slideUp(500, function () {
        $(".jquery-selected-alert").slideUp(500);
      });
      return
    }

    if (same_rule) {
      $('.order_batch_print_courier_labels').addClass('d-none')
      $('.manual-dispatch-csv').removeClass('d-none')
    }
    else {
      $('.order_batch_print_courier_labels').removeClass('d-none')
      $('.manual-dispatch-csv').addClass('d-none')
    }
    if (!same_export) {
      $('.jquery-selected-alert').html('Please select orders with same rule and export')
      $('.jquery-selected-alert').addClass('bg-danger').removeClass('d-none').removeClass('bg-success')
      $(".jquery-selected-alert").fadeTo(4000, 500).slideUp(500, function () {
        $(".jquery-selected-alert").slideUp(500);
      });
    }
    else if (object_ids.length > 0) {
      $('.total_orders').html(object_ids.length)
      $('.total_products').html(count)
      $('input[name="order_ids"]').val(order_ids)
      $('.OrderBatchModal').modal('show')
    }
    else {
      $('.jquery-selected-alert').html('Please select orders first!')
      $('.jquery-selected-alert').addClass('bg-danger').removeClass('d-none').removeClass('bg-success')
      $(".jquery-selected-alert").fadeTo(4000, 500).slideUp(500, function () {
        $(".jquery-selected-alert").slideUp(500);
      });
    }
  })

  // $('.OrderBatchModal').on('hidden.bs.modal', function () {
  //   if ($('.OrderBatchSubmit').is(":disabled")) {
  //     window.location.reload()
  //   }
  // })

  $('.batches-select').on('change', function () {
    $('.batches-button-submit').trigger('click');
  })

  $('.pick-preset-select').on('change', function () {
    var selected_value = $(this).val()
    $.ajax({
      url: '/order_batches/set_pick_preset',
      type: 'GET',
      data: { id: selected_value },
      dataType: 'json',
      success: function (response) {
        $("#order_batch_print_packing_list").prop("checked", response[0]['print_packing_list']);
        $("#order_batch_print_packing_list_option").val(response[0]['print_packing_list_option'])
        $("#order_batch_mark_as_picked").prop("checked", response[0]['mark_as_picked']);
        $("#order_batch_print_courier_labels").prop("checked", response[0]['print_courier_labels']);
        $("#order_batch_print_invoice").prop("checked", response[0]['print_invoice']);
        $("#order_batch_update_channels").prop("checked", response[0]['update_channels']);
        $("#order_batch_mark_order_as_dispatched").prop("checked", response[0]['mark_order_as_dispatched']);
        $("#order_batch_mark_as_batch_name").prop("checked", response[0]['mark_as_batch_name']);
        // $("#order_batch_batch_name").prop("checked", response[0]['print_packing_list']);
        $("#batch-name-search").val(response[0]['batch_name'])
        $("#order_batch_shipping_rule_max_weight").prop("checked", response[0]['shipping_rule_max_weight']);
        $("#order_batch_overwrite_order_notes").prop("checked", response[0]['overwrite_order_notes']);
        $("#order_batch_packing_slip").prop("checked", response[0]['packing_slip']);
        if(response[0]['print_packing_list']){
          $('.print-packing-list-options').removeClass('d-none')
        }
        else{
          $('.print-packing-list-options').addClass('d-none')
        }
      }
    })

  })

  $('.OrderBatchSubmit').on('click', function () {
    var csv_export = $("#order_batch_print_courier_labels").prop("checked")

    if (csv_export) {
      var object_ids = $('input[name="object_ids[]"]:checked')
      var rule = object_ids.map(function (i, e) { return e.dataset.courier }).toArray();
      var tracking = object_ids.map(function (i, e) { return e.dataset.tracking }).toArray();
      var same_rule = rule.every((val, i, arr) => val === arr[0]) && rule[0] == 'Manual Dispatch'
      if (same_rule) {
        var dispatch_button = $('.one-click-dispatch')
        dispatch_button.toggleClass('one-click-dispatch upload_trackings')
        dispatch_button.attr('data-toggle', 'modal')
        dispatch_button.attr('data-target', '.upload-trackings')
        if (tracking[0] == 'true'){
          $('.upload-trackings').modal('show')
        }
      }
      else {
        window.location.reload()
      }
    }
  })

  $('.upload_trackings').on('click', function () {
    var object_ids = $('input[name="object_ids[]"]:checked')
    var tracking = object_ids.map(function (i, e) { return e.dataset.tracking }).toArray();
    if (tracking[0] == 'true') {
      $('.upload-trackings').modal('show')
    }
  })

  $('.upload-trackings').on('shown.bs.modal', function () {
    var object_ids = $('input[name="object_ids[]"]:checked')
    var order_ids = object_ids.map(function (i, e) { return e.value }).toArray();
    var count = 0
    object_ids.map(function (i, e) { return count = count + parseInt(e.dataset.item) })
    var export_ids = object_ids.map(function (i, e) { return e.dataset.export }).toArray();
    $('#tracking_orders').val(order_ids)
    $('#export_id').val(export_ids[0])
  })

  $('#q_sales_channel_eq').on('change', function () {
    $('.customer_ransack_submit').trigger('click')
  })

  $('.assign_user').on('click', function () {
    var batchId = this.dataset.id;
    $('#batch_id').val(batchId);
    $('#packer-modal').modal('show');
  })

  $('.add-flagging-button').on('click', function () {
    var customer_id = this.dataset.id
    $('#customer_id_for_flagging').val(customer_id)
    $('#add-flagging-date-modal').modal('show');
  })

  $('.add-tracking-button').on('click', function () {
    var order_id = this.dataset.id
    $('#order_id_for_tracking').val(order_id)
    $('#add-tracking-modal').modal('show');
  })

  $('.edit-tracking').on('click', function () {
    var tracking_id = this.dataset.id
    var tracking_value = this.dataset.value
    $('#tracking_id_for_edit').val(tracking_id)
    $('.edit-tracking-field').val(tracking_value)
    $('#edit-tracking').modal('show');
  })

  // loader remove
  $('.showLoader').on('click', function () {
    $('.cover-spin, .loading').removeClass('d-none')
  });

  $('.importMultiFileForm').on('submit', function(){
    $('.cover-spin, .loading').removeClass('d-none')
  })

  $('.import-mapping-form').on('click', function () {
    var sub_type = $('.sub-type').val()
    var table_name = $('.table-name').val()
    if (sub_type.length === 0) {
      alert('Please enter the description.');
    }
    else if(table_name == 'Tracking'){
      $('#import-mapping-tracking-modal').modal('show');
    }
    else{
      $('.submit-import-mapping-form').submit();
    }
  })

  $('.eye-button-pin').on('click', function(){
    var type = $('#userPin').prop('type');
    if (type == 'text'){
      $('#userPin').prop('type', 'password');
    }
    else{
      $('#userPin').prop('type', 'text');
    }
  })

});

// Preloader JS
$(window).on('turbolinks:load', function () {
  $('.preloader').fadeOut();
});

$(document).on('turbolinks:click', function () {
  $('.cover-spin, .loading').removeClass('d-none')
});

$(document).on('turbolinks:load', function () {
  $('.cover-spin, .loading').addClass('d-none')
});

$(document).on('turbolinks:render', function () {
  $('.cover-spin, .loading').addClass('d-none')
});