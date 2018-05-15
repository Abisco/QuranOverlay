class CreateQuranVerses < ActiveRecord::Migration[5.1]
  def change
    create_table :quran_verses do |t|

      t.timestamps
      t.integer :surah_id
      t.integer :verse_id
      t.text :arabic_ayah
      t.text :shakir_ayah
    end
  end
end
