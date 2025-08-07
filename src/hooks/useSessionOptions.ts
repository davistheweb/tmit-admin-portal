import { useState } from "react";

// this code Generates session options (current year to next 5 years, which will be extensible)
// I used this so that in the next 5 years, it will be updated
export const useSessionOptions = (setSessionValue: CallableFunction) => {
  const currentYear = new Date().getFullYear();
  const initialSessions = Array.from({ length: 6 }, (_, i) => {
    const year = 2019 + i;
    return {
      label: `${year}/${year + 1}`,
      value: (year % 100).toString().padStart(2, "0"),
    };
  });
  const futureSessions = Array.from({ length: 5 }, (_, i) => {
    const year = currentYear + i;
    return {
      label: `${year}/${year + 1}`,
      value: (year % 100).toString().padStart(2, "0"),
    };
  });

  const [sessionOptions, setSessionOptions] = useState<
    { label: string; value: string }[]
  >([...initialSessions, ...futureSessions]);

  const handleSessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedYear = parseInt(`20${selectedValue}`);
    if (selectedYear >= currentYear + 4) {
      const nextSessions = Array.from({ length: 5 }, (_, i) => {
        const year = selectedYear + 1 + i;
        return {
          label: `${year}/${year + 1}`,
          value: (year % 100).toString().padStart(2, "0"),
        };
      }).filter(
        (newSession) =>
          !sessionOptions.some((s) => s.value === newSession.value),
      );

      setSessionOptions((prev) => [...prev, ...nextSessions]);
    }

    setSessionValue("session", selectedValue);
  };

  return { sessionOptions, handleSessionChange };
};

/* { label: "2019/2020", value: "19" },
{ label: "2020/2021", value: "20" },
{ label: "2021/2022", value: "21" },
{ label: "2022/2023", value: "22" },
{ label: "2023/2024", value: "23" },
{ label: "2024/2025", value: "24" },
...Array.from({ length: 5 }, (_, i) => {
  const year = currentYear + i;
  return {
    label: `${year}/${year + 1}`,
    value: year.toString().slice(-2),
  };
}),
 */
