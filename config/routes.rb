Rails.application.routes.draw do
  devise_for :users
  root to: "messages#index"
<<<<<<< Updated upstream


  
=======
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update]
>>>>>>> Stashed changes
end
