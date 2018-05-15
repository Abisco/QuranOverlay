# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'    

CSV.foreach("quran.csv", :headers => true) do |row|
  @verse = row.to_hash
  @new_verse = QuranVerse.new(
    :surah_id => @verse[@verse.first[0]].to_i,
    :verse_id => @verse["verse_id"].to_i,
    :arabic_ayah => @verse["arabic_ayah"],
    :shakir_ayah => @verse["shakir_ayah"]
  )
  @new_verse.save
end