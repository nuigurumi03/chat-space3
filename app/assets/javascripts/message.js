$(function(){
  function buildHTML(message){
    var imageUrl = (message.image_url)? `<img class="lower-message__image" src="${message.image_url}">`:"";
    var html = `
      <div class="message" data-message_id = ${message.id} >
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
          <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
          ${imageUrl}
        </div>
      </div>`
    return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData, 
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
        var html = buildHTML(message);
        $(`.messages`).append(html);
        $('.submit__input-box__btn').attr("disabled",false);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $('#new_message')[0].reset();
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $(".message:last").data("message_id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i,message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        });
      })
      .fail(function() {
        alert('メッセージの送信に失敗しました');
      })
    }
  }
  
  setInterval(reloadMessages, 7000);
});
