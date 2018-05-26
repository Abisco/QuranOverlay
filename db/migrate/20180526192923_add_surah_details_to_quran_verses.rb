class AddSurahDetailsToQuranVerses < ActiveRecord::Migration[5.1]
  def change
    add_column :quran_verses, :surah_name_arabic, :string
    add_column :quran_verses, :surah_name_latin, :string
    add_column :quran_verses, :surah_name_english, :string
  end
end
