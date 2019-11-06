# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_11_06_044134) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "ahoy_events", force: :cascade do |t|
    t.bigint "visit_id"
    t.bigint "user_id"
    t.string "name"
    t.jsonb "properties"
    t.datetime "time"
    t.index ["name", "time"], name: "index_ahoy_events_on_name_and_time"
    t.index ["properties"], name: "index_ahoy_events_on_properties", opclass: :jsonb_path_ops, using: :gin
    t.index ["user_id"], name: "index_ahoy_events_on_user_id"
    t.index ["visit_id"], name: "index_ahoy_events_on_visit_id"
  end

  create_table "ahoy_visits", force: :cascade do |t|
    t.string "visit_token"
    t.string "visitor_token"
    t.bigint "user_id"
    t.string "ip"
    t.text "user_agent"
    t.text "referrer"
    t.string "referring_domain"
    t.text "landing_page"
    t.string "browser"
    t.string "os"
    t.string "device_type"
    t.string "country"
    t.string "region"
    t.string "city"
    t.float "latitude"
    t.float "longitude"
    t.string "utm_source"
    t.string "utm_medium"
    t.string "utm_term"
    t.string "utm_content"
    t.string "utm_campaign"
    t.string "app_version"
    t.string "os_version"
    t.string "platform"
    t.datetime "started_at"
    t.index ["user_id"], name: "index_ahoy_visits_on_user_id"
    t.index ["visit_token"], name: "index_ahoy_visits_on_visit_token", unique: true
  end

  create_table "deliverables", force: :cascade do |t|
    t.integer "number_of_page"
    t.bigint "product_id", null: false
    t.bigint "order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_deliverables_on_order_id"
    t.index ["product_id"], name: "index_deliverables_on_product_id"
  end

  create_table "documents", force: :cascade do |t|
    t.string "name"
    t.integer "number_of_page"
    t.bigint "ahoy_visit_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_documents_on_user_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.bigint "payment_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["payment_id"], name: "index_invoices_on_payment_id"
  end

  create_table "order_items", force: :cascade do |t|
    t.integer "quantity", default: 1
    t.integer "price"
    t.bigint "product_id", null: false
    t.bigint "document_id", null: false
    t.bigint "order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["document_id"], name: "index_order_items_on_document_id"
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_id"], name: "index_order_items_on_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "ahoy_visit_id"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "paid", default: false
    t.boolean "agreed_to_terms_and_conditions", default: false
    t.boolean "archived", default: false
    t.string "secret_code"
    t.bigint "selected_partner_id"
    t.bigint "printer_id"
    t.string "type"
    t.index ["printer_id"], name: "index_orders_on_printer_id"
    t.index ["secret_code"], name: "index_orders_on_secret_code", unique: true
    t.index ["selected_partner_id"], name: "index_orders_on_selected_partner_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "partners", force: :cascade do |t|
    t.string "name"
    t.string "address"
    t.string "city"
    t.string "postcode"
    t.string "country"
    t.float "lat"
    t.float "lng"
    t.string "opening_hours"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "firstname"
    t.string "lastname"
    t.string "email"
    t.string "password_hash"
    t.string "password_salt"
    t.index ["email"], name: "index_partners_on_email", unique: true
  end

  create_table "payments", force: :cascade do |t|
    t.string "stripe_id"
    t.integer "amount"
    t.bigint "order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_payments_on_order_id"
  end

  create_table "printing_attempts", force: :cascade do |t|
    t.bigint "partner_id", null: false
    t.bigint "deliverable_id", null: false
    t.boolean "printed", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["deliverable_id"], name: "index_printing_attempts_on_deliverable_id"
    t.index ["partner_id"], name: "index_printing_attempts_on_partner_id"
  end

  create_table "products", force: :cascade do |t|
    t.integer "price"
    t.string "format"
    t.boolean "color"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "firstname"
    t.string "lastname"
    t.string "email"
    t.string "password_hash"
    t.string "password_salt"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "deliverables", "orders"
  add_foreign_key "deliverables", "products"
  add_foreign_key "documents", "users"
  add_foreign_key "invoices", "payments"
  add_foreign_key "order_items", "documents"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "products"
  add_foreign_key "orders", "partners", column: "printer_id"
  add_foreign_key "orders", "partners", column: "selected_partner_id"
  add_foreign_key "orders", "users"
  add_foreign_key "payments", "orders"
  add_foreign_key "printing_attempts", "deliverables"
  add_foreign_key "printing_attempts", "partners"
end
