$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html =
        `<div class="main-chat__body__list"  data-message-id=${message.id}>
            <div class="main-chat__body__list__upper">
              <div class="main-chat__body__list__upper__name">
                ${message.user_name}
              </div>
              <div class="main-chat__body__list__upper__date">
                ${message.created_at}
              </div>
            </div>
            <div class="main-chat__body__list__lower">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image}, class = "lower-message__image">
          </div>`
        return html;
      } else {
        var html =
        `<div class="main-chat__body__list" data-message-id=${message.id}>
            <div class="main-chat__body__list__upper">
              <div class="main-chat__body__list__upper__name">
                ${message.user_name}
              </div>
              <div class="main-chat__body__list__upper__date">
                ${message.created_at}
              </div>
            </div>
            <div class="main-chat__body__list__lower">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__body').append(html);
      $('.main-chat__body').animate({ scrollTop: $('.main-chat__body')[0].scrollHeight});
      $('.new-message__right-form').attr('disabled', false);　
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
  var reloadMessages = function() {
    var last_message_id = $('.main-chat__body__list:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.main-chat__body').append(insertHTML);
      $('.main-chat__body').animate({ scrollTop: $('.main-chat__body')[0].scrollHeight});
    }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
