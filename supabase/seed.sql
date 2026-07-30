-- Datos de muestra para ver el directorio con contenido. Ejecutar tras schema.sql.

insert into specialties (slug, name_es, name_ca, name_en) values
  ('psicologo', 'Psicólogo', 'Psicòleg', 'Psychologist'),
  ('logopeda', 'Logopeda', 'Logopeda', 'Speech therapist'),
  ('pedagogo', 'Pedagogo', 'Pedagog', 'Pedagogue'),
  ('terapeuta-ocupacional', 'Terapeuta ocupacional', 'Terapeuta ocupacional', 'Occupational therapist'),
  ('fisioterapeuta', 'Fisioterapeuta', 'Fisioterapeuta', 'Physiotherapist'),
  ('dentista', 'Dentista', 'Dentista', 'Dentist');

-- Nota: los terapeutas reales cuelgan de auth.users. Para probar, creá usuarios
-- desde el panel de Auth y enlazá su uuid en profiles/therapists.
