create or replace function default_guid() returns trigger as $$
    begin       
        if (new.guid is null) then
            new.guid := uuid_generate_v4();
        end if;
        return new;
    end;
$$ language plpgsql;

drop trigger default_guid on "Books"

create trigger default_guid
before insert on "Books"
    for each row execute procedure default_guid();


insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Зеленый луч', '{"Кайл Иторр"}', 0, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Змеиное логово', '{"Кайл Иторр"}', 0, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Простые оружные парни', '{"Владимир Стрельников"}', 0, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Путанабус. Лишние Земли лишних', '{"Дмитрий Старицкий"}', 0, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Путанабус. Две свадьбы и одни похороны', '{"Дмитрий Старицкий"}', 0, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Путанабус. Наперегонки со смертью', '{"Дмитрий Старицкий"}', 0, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Резервист', '{"Владимир Стрельников"}', 0, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Лишнее золото. Судьбы цвета хаки', '{"Игорь Негатин"}', 0, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Лишнее золото. Без права на выбор', '{"Игорь Негатин"}', 0, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Лишнее золото. За гранью джихада', '{"Игорь Негатин"}', 0, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Лишнее золото. Наедине с мечтой', '{"Игорь Негатин"}', 0, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);

-------------------------------------------------------------------------------------------------------------------------------------------------------
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Нижний уровень', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 100, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Нижний уровень 2', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 234, 456, 'фантастика', '2020-08-11', null, 0, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('На пороге тьмы', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 0, 456, 'фантастика', '2020-08-11', null, 1, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Двери во тьме', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 0, 456, 'фантастика', '2020-08-11', null, 1, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Возле тьмы. Чужой', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 0, 456, 'фантастика', '2020-08-11', null, 1, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Странник', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 0, 456, 'фантастика', '2020-08-11', null, 1, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Странники', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 0, 456, 'фантастика', '2020-08-11', null, 1, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Бандит', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 0, 456, 'фантастика', '2020-08-11', null, 1, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Мир Цитадели', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 0, 456, 'фантастика', '2020-08-11', null, 1, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Земля лишних. Побег', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 120, 456, 'фантастика', '2020-08-01', null, 1, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Земля лишних. Коммерсант', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 12, 456, 'фантастика', '2020-08-01', null, 1, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Земля лишних. Исход', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 0, 791, 'фантастика', '2020-08-01', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Земля лишних. Новая жизнь', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 0, 791, 'фантастика', '2020-09-02', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Земля лишних. За други своя', '{"Андрей Круз"}', 1, '{"боевик", "другие миры", "авантюра"}', 234, 791, 'фантастика', '2020-09-01', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Земля лишних. Два билета туда', '{"Андрей Круз", "Андрей Царев"}', 2, '{"боевик", "другие миры", "криминал", "авантюра"}', null, null, 'фантастика', '2020-08-30', '2020-08-31', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Чужой. Холодная кузница', '{"Алекс Уайт"}', 2, '{"боевик", "пришельцы", "ксеноморфы"}', 668, 668, 'фантастика', '2020-08-23', '2020-08-27', 2, 'Не понравилось', 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Чужие', '{"Дин Алан Форестер"}', 2, '{"боевик", "пришельцы", "ксеноморфы"}', null, null, 'фантастика', '2020-08-20', '2020-08-22', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Чужой', '{"Дин Алан Форестер"}', 2, '{"боевик", "пришельцы", "ксеноморфы"}', null, null, 'фантастика', '2020-08-17', '2020-08-20', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Война миров', '{"Герберт Уэллс"}', 2, '{"пришельцы", "марсеане"}', null, null, 'фантастика', '2020-08-03', '2020-08-06', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Как не умереть молодым', '{"Алексей Решетун"}', 2, '{"судмедэкспертиза", "медицина", "нон-фикшн", "научпоп"}', null, null, 'Научпоп', null, '2020-08-02', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Вскрытие покажет', '{"Алексей Решетун"}', 2, '{"судмедэкспертиза", "медицина", "нон-фикшн"}', null, null, 'Биография', null, '2020-08-01', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Между жизнями', '{"Алексей Решетун"}', 2, '{"судмедэкспертиза", "медицина", "нон-фикшн"}', null, null, 'Биография', null, '2020-07-30', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Мертвый Лерой', '{"Андрей Круз"}', 2, '{"зомби", "постапокалипсис"}', null, null, 'Фантастика', null, '2020-07-27', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Те, кто выжили', '{"Андрей Круз"}', 2, '{"зомби", "постапокалипсис"}', null, null, 'Фантастика', null, '2020-07-26', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('От чужих берегов', '{"Андрей Круз"}', 2, '{"зомби", "постапокалипсис"}', null, null, 'Фантастика', null, '2020-07-22', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Я! Еду! Домой!', '{"Андрей Круз"}', 2, '{"зомби", "постапокалипсис"}', null, null, 'Фантастика', null, '2020-07-18', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Эпоха мертвых. Начало', '{"Андрей Круз"}', 2, '{"зомби", "постапокалипсис"}', null, null, 'Фантастика', null, '2020-07-16', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Эпоха мертвых. Москва', '{"Андрей Круз"}', 2, '{"зомби", "постапокалипсис"}', null, null, 'Фантастика', null, '2020-07-12', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Эпоха мертвых. Прорыв', '{"Андрей Круз"}', 2, '{"зомби", "постапокалипсис"}', null, null, 'Фантастика', null, '2020-07-09', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Как устроен javascript', '{"Дуглас Крокфорд"}', 2, '{"программирование", "it", "javascript"}', null, null, 'Компьютерная литература', null, '2020-06-26', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Таинственный рыцарь', '{"Джордж Мартин"}', 2, '{"средневековье", "Игра Престолов"}', null, null, 'фентези', null, '2019-12-28', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Присяжный рыцарь', '{"Джордж Мартин"}', 2, '{"средневековье", "Игра Престолов"}', null, null, 'фентези', null, '2019-12-27', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Межевой рыцарь', '{"Джордж Мартин"}', 2, '{"средневековье", "Игра Престолов"}', null, null, 'фентези', null, '2019-12-26', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Танец с драконами', '{"Джордж Мартин"}', 2, '{"средневековье", "Игра Престолов"}', null, null, 'фентези', null, '2019-12-24', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Пир стервятников', '{"Джордж Мартин"}', 2, '{"средневековье", "Игра Престолов"}', null, null, 'фентези', null, '2019-12-09', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Буря мечей', '{"Джордж Мартин"}', 2, '{"средневековье", "Игра Престолов"}', null, null, 'фентези', null, '2019-11-27', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Битва королей', '{"Джордж Мартин"}', 2, '{"средневековье", "Игра Престолов"}', null, null, 'фентези', null, '2019-11-10', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Игра престолов', '{"Джордж Мартин"}', 2, '{"средневековье", "Игра Престолов"}', null, null, 'фентези', null, '2019-10-28', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Идеальный программист', '{"Роберт Мартин"}', 2, '{"программирование", "работа"}', null, null, 'компьютерная литература', null, '2019-09-15', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Чистая архитектура', '{"Роберт Мартин"}', 2, '{"программирование", "работа", "архитектура"}', null, null, 'компьютерная литература', null, '2019-02-17', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Чистый код', '{"Роберт Мартин"}', 2, '{"программирование", "работа", "код"}', null, null, 'компьютерная литература', null, '2019-02-02', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('О дивный новый мир', '{"Олдос Хаксли"}', 2, '{"антиутопия", "будущее"}', null, null, 'фантастика', null, '2018-04-19', 2, null, 1);
insert into "Books"("Name", "Authors", "Status", "Tags", "DoneUnits", "TotalUnits", "Genre", "StartDate", "EndDate", "Type", "Note", "UserId")
values('Паттерны проектирования', '{"Эрик Фримен", "Элизабет Фримен", "Кэтти Сьерра", "Берт Бейтс"}', 2, '{"программирование", "работа", "архитектура"}', null, null, 'компьютерная литература', null, '2018-04-10', 2, null, 1);
