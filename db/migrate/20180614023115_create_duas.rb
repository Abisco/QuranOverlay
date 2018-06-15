class CreateDuas < ActiveRecord::Migration[5.1]
  def change
    create_table :duas do |t|

      t.string :dua_name_arabic
      t.integer :line_id
      t.text :arabic
      t.text :english_translation
    end
  end
end
