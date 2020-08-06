import { Request, Response } from "express";

import db from "../database/connection";
import convertHourMinutes from "../utils/convertHourMinutes";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    if(!filters.week_day || !filters.subject || !filters.time){
      return response.status(400).json({
        error: 'Voce precisa informa um filtro'
      })
    }
  
  const timeInMinutes = convertHourMinutes(filters.time as String)

console.log(timeInMinutes)    
  return response.send()
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trx = await db.transaction();

    try {
      const insertedUsersIds = await trx("users").insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const user_id = insertedUsersIds[0];

      await trx("classes").insert({
        subject,
        cost,
        user_id,
      });

      const class_id = insertedUsersIds[0];

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourMinutes(scheduleItem.from),
          to: convertHourMinutes(scheduleItem.to),
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      await trx.rollback();
      return response.status(400).json({
        error: "Deu errinho 😁",
      });
    }
  }
}
