"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
}

export const DateTimePicker = ({ value, onChange }: DateTimePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
        >
          {value ? format(value, "PPP p") : "Pick a date & time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (date) {
              // Set time to current or default to 00:00
              const updatedDate = new Date(date);
              updatedDate.setHours(value?.getHours() || 0);
              updatedDate.setMinutes(value?.getMinutes() || 0);
              onChange(updatedDate);
              setOpen(false);
            }
          }}
        />
        <div className="p-3 border-t flex gap-2 items-center">
          <input
            type="time"
            value={value ? format(value, "HH:mm") : "00:00"}
            onChange={(e) => {
              const [hours, minutes] = e.target.value.split(":").map(Number);
              const updated = new Date(value || new Date());
              updated.setHours(hours);
              updated.setMinutes(minutes);
              onChange(updated);
            }}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
