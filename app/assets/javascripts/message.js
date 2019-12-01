$(function(){
  function buildMessage(message){
    var image_url = (message.image_url)? `<img class="lower-message__image" src="${message.image_url}">`:"";
    var html_common = `
      <div class="message">
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
            </p>`
    
    if(message.image_url === null ){
      var html = html_common + `</div>
                </div>`
      return html;
    }else{
      var html = html_common + `<img class= "lower-message__image", src= ${message.image_url}>
                  </div>
                </div>`
      return html;
    }
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
        var html = buildMessage(message);
        $(`.messages`).append(html);
        $('.submit__btn').attr("disabled",false);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました");
    })
  })
});