/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Col, Flex } from "antd";
import type { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api.";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import type { TAcademicSemester, TResponse } from "../../../types";

function SemesterRegistration() {
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const { data: academicSemester } = useGetAllSemestersQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);
  // console.log({ academicSemester });

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating academic semester...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    // console.log("🚀 ~ onSubmit ~ semesterData:", semesterData);

    try {
      const res = (await addSemesterRegistration(
        semesterData,
      )) as TResponse<TAcademicSemester>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Academic semester created successfully", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Failed to create academic semester", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <PHSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />

          <PHDatePicker label="Start Date" name="startDate" />

          <PHDatePicker label="End Date" name="endDate" />

          <PHInput type="text" label="Min Credit" name="minCredit" />

          <PHInput type="text" label="Max Credit" name="maxCredit" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
}

export default SemesterRegistration;
