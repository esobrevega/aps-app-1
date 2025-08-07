"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const DateTimePicker = ({ 
  value, 
  onChange, 
  className, 
  placeholder = "Select date", 
}: DateTimePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn(
              "w-full justify-start text-left font-normal px-3", 
              !value && "text-muted-foreground",
              className
          )}
        >
          <CalendarIcon className="size-4 mr-2"/>
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
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
        <div className="p-3 border-t flex gap-2 items-center justify-between">
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onChange(undefined);
              setOpen(false);
            }}
            className="ml-2"
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
