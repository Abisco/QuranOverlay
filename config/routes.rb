Rails.application.routes.draw do
  resources :duas
  scope '/api' do
    resources :quran_verses
    resources :duas
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
