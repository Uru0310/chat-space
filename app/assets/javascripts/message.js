$(function(){
    function buildHTML(message){
      if ( message.image ) {
        var html =
        `<div class="main-chat__body__list">
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
        `<div class="main-chat__body__list">
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
});
