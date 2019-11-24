# README

## DB設計
## usersテーブル
| Column   | Type   | Options    |
| -------- | ------ | ---------- |
| name     | string | null:false |
| email    | string | null:false |
| password | string | null:false |
### Association
- has_many :posts
- has_many :users_groups
- has_many :groups, through: :users_groups

# postsテーブル
| Column   | Type    | Options                     |
| -------- | ------- | --------------------------- |
| body     | text    |                             |
| image    | string  |                             |
| user_id  | integer | null:false,foreign_key:true |
| group_id | integer | null:false.foregin_key:true |
### Association
- belongs_to :user
- belongs_to :group

# groupsテーブル
| Column | Type   | Options                     |
| ------ | ------ | --------------------------- |
| name   | string | null:false.foregin_key:true |
### Association
- has_many :users_groups
- has_many :users, through: :users_groups
- has_many :posts

# users_groupsテーブル
| Column   | Type    | Option                      |
| -------- | ------- | --------------------------- |
| user_id  | integer | null:false,foreign_key:true |
| group_id | integer | null:false,foreign_key:true |
### Association
- belongs_to :post
- belongs_to :user