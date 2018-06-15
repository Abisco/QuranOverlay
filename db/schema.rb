# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180614023115) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "duas", force: :cascade do |t|
    t.string "dua_name_arabic"
    t.integer "line_id"
    t.text "arabic"
    t.text "english_translation"
  end

  create_table "quran_verses", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "surah_id"
    t.integer "verse_id"
    t.text "arabic_ayah"
    t.text "shakir_ayah"
    t.string "surah_name_arabic"
    t.string "surah_name_latin"
    t.string "surah_name_english"
  end

end
