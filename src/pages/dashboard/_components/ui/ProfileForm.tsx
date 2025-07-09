// ProfileForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profileSchema } from "@/lib/validators/profileSchema";

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
  };

  const baseInputClass = "input w-full";
  const errorInputClass = "border-red-500";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-4xl mx-auto px-4 py-6"
    >
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="label">Surname</label>
          <input
            {...register("firstName")}
            className={`${baseInputClass} ${
              errors.firstName ? errorInputClass : ""
            }`}
          />
          {errors.firstName && (
            <p className="error">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="label">Middle Name</label>
          <input {...register("middleName")} className={baseInputClass} />
        </div>
        <div>
          <label className="label">Last Name</label>
          <input
            {...register("lastName")}
            className={`${baseInputClass} ${
              errors.lastName ? errorInputClass : ""
            }`}
          />
          {errors.lastName && (
            <p className="error">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Gender and DOB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Gender</label>
          <select
            {...register("gender")}
            className={`${baseInputClass} ${
              errors.gender ? errorInputClass : ""
            }`}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="error">{errors.gender.message}</p>}
        </div>
        <div>
          <label className="label">Date of Birth</label>
          <input
            type="date"
            {...register("dateOfBirth")}
            className={`${baseInputClass} ${
              errors.dateOfBirth ? errorInputClass : ""
            }`}
          />
          {errors.dateOfBirth && (
            <p className="error">{errors.dateOfBirth.message}</p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="label">Country</label>
          <input
            {...register("country")}
            className={`${baseInputClass} ${
              errors.country ? errorInputClass : ""
            }`}
          />
          {errors.country && <p className="error">{errors.country.message}</p>}
        </div>
        <div>
          <label className="label">State of Origin</label>
          <input
            {...register("stateOfOrigin")}
            className={`${baseInputClass} ${
              errors.stateOfOrigin ? errorInputClass : ""
            }`}
          />
          {errors.stateOfOrigin && (
            <p className="error">{errors.stateOfOrigin.message}</p>
          )}
        </div>
        <div>
          <label className="label">LGA</label>
          <input
            {...register("lga")}
            className={`${baseInputClass} ${errors.lga ? errorInputClass : ""}`}
          />
          {errors.lga && <p className="error">{errors.lga.message}</p>}
        </div>
      </div>

      <div>
        <label className="label">Home Town</label>
        <input
          {...register("homeTown")}
          className={`${baseInputClass} ${
            errors.homeTown ? errorInputClass : ""
          }`}
        />
        {errors.homeTown && <p className="error">{errors.homeTown.message}</p>}
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Phone Number</label>
          <input
            {...register("phone")}
            className={`${baseInputClass} ${
              errors.phone ? errorInputClass : ""
            }`}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="label">NIN</label>
          <input {...register("nin")} className={baseInputClass} />
        </div>
      </div>

      <div>
        <label className="label">Contact Address</label>
        <input
          {...register("address")}
          className={`${baseInputClass} ${
            errors.address ? errorInputClass : ""
          }`}
        />
        {errors.address && <p className="error">{errors.address.message}</p>}
      </div>

      {/* Medical Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="label">Blood Group</label>
          <select
            {...register("bloodGroup")}
            className={`${baseInputClass} ${
              errors.bloodGroup ? errorInputClass : ""
            }`}
          >
            <option value="">Select</option>
            <option>O+</option>
            <option>O-</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
          {errors.bloodGroup && (
            <p className="error">{errors.bloodGroup.message}</p>
          )}
        </div>
        <div>
          <label className="label">Genotype</label>
          <select
            {...register("genotype")}
            className={`${baseInputClass} ${
              errors.genotype ? errorInputClass : ""
            }`}
          >
            <option value="">Select</option>
            <option>AA</option>
            <option>AS</option>
            <option>SS</option>
            <option>AC</option>
            <option>SC</option>
          </select>
          {errors.genotype && (
            <p className="error">{errors.genotype.message}</p>
          )}
        </div>
        <div>
          <label className="label">Religion</label>
          <select
            {...register("religion")}
            className={`${baseInputClass} ${
              errors.religion ? errorInputClass : ""
            }`}
          >
            <option value="">Select</option>
            <option>Christianity</option>
            <option>Islam</option>
            <option>Other</option>
          </select>
          {errors.religion && (
            <p className="error">{errors.religion.message}</p>
          )}
        </div>
      </div>

      {/* Submit */}
      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Save & Continue
        </button>
      </div>
    </form>
  );
}
