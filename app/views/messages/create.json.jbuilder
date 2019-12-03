json.content @message.content
json.image_url @message.image_url
json.created_at @message.created_at.strftime('%Y/%m/%d %R')
json.user_name  @message.user.name
json.id @message.id