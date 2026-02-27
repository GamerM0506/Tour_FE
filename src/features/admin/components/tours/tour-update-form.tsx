"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTourSchema, CreateTourFormValues } from "@/features/admin/schemas/tour-schema";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Textarea } from "@/core/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select";
import { Checkbox } from "@/core/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/components/ui/card";
import { Plus, Trash2, Save, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tourService } from "@/features/tours/services/tour-service";
import { TourCategory, TourStatus, Tour } from "@/features/tours/types";
import { ImageUpload } from "../ui/image-upload";
import { generateSlug } from "@/core/utils/string-utils";

interface TourUpdateFormProps {
    tour: Tour;
}

export const TourUpdateForm = ({ tour }: TourUpdateFormProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const form = useForm({
        resolver: zodResolver(CreateTourSchema),
        defaultValues: {
            name: tour.name,
            description: tour.description,
            category: tour.category as TourCategory,

            basePrice: tour.pricing?.basePrice || 0,
            currency: tour.pricing?.currency || "USD",
            isFree: tour.pricing?.isFree || false,

            status: tour.status,

            durationHours: tour.durationHours,
            pickupAvailable: tour.pickupAvailable,
            wheelchairAccessible: tour.wheelchairAccessible,
            meetingPoint: tour.meetingPoint,

            itinerary: tour.itinerary?._steps?.map(step => ({
                title: step.title,
                description: step.description ?? "",
            })) ?? [],

            images: tour.images || [],
            inclusions: tour.inclusions || [],
            exclusions: tour.exclusions || []
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "itinerary",
    });

    const mutation = useMutation({
        mutationFn: (data: any) => tourService.updateTour({ id: tour.id, data }),
        onSuccess: () => {
            toast.success("Tour updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
            queryClient.invalidateQueries({ queryKey: ["tour", tour.id] });
            router.push("/admin/tours");
        },
        onError: (error: any) => {
            const msg = error.response?.data?.message;
            toast.error(Array.isArray(msg) ? msg[0] : msg || "Update failed");
        }
    });

    // 3. Submit Handler
    const onSubmit = (data: CreateTourFormValues) => {
        const apiPayload = {
            name: data.name,
            slug: generateSlug(data.name),
            description: data.description,
            durationHours: Number(data.durationHours),
            category: data.category,

            // 👇 QUAN TRỌNG: Gửi Status đi khi Update
            status: data.status,

            pickupAvailable: data.pickupAvailable,
            meetingPoint: data.meetingPoint,
            wheelchairAccessible: data.wheelchairAccessible,

            pricing: {
                basePrice: Number(data.basePrice),
                currency: data.currency,
                isFree: data.isFree,
                tiers: [],
                surcharges: []
            },

            itinerary: {
                steps: data.itinerary.map((step, index) => ({
                    order: index + 1,
                    title: step.title,
                    description: step.description || "",
                })),
            },

            inclusions: data.inclusions,
            exclusions: data.exclusions,
            images: data.images
        };

        console.log("🚀 Update Payload:", apiPayload);
        mutation.mutate(apiPayload);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-20">
                {/* HEADER */}
                <div className="flex items-center justify-between sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 border-b border-gray-100 -mx-6 px-6">
                    <div className="flex items-center gap-4">
                        <Button type="button" variant="outline" size="icon" onClick={() => router.back()}>
                            <ArrowLeft size={18} />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-forest">Edit Journey</h1>
                            <p className="text-gray-500 text-sm">Update details for <span className="font-semibold text-forest">{tour.name}</span></p>
                        </div>
                    </div>
                    <Button type="submit" className="bg-terracotta hover:bg-terracotta/90 text-white" disabled={mutation.isPending}>
                        {mutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : <><Save size={16} className="mr-2" /> Update Tour</>}
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* CỘT TRÁI */}
                    <div className="lg:col-span-2 space-y-8">
                        <Card>
                            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control} name="images"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Cover Image</FormLabel>
                                            <FormControl>
                                                <ImageUpload value={field.value?.[0]} onChange={(url) => field.onChange([url])} label="Upload Cover Image" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control} name="name"
                                        render={({ field }) => (
                                            <FormItem className="col-span-full">
                                                <FormLabel>Tour Name</FormLabel>
                                                <FormControl><Input {...field} value={field.value as string} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control} name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                                    <SelectContent>
                                                        {Object.values(TourCategory).map((cat) => (
                                                            <SelectItem key={cat} value={cat}>{cat.replace('_', ' ')}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control} name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl><Textarea className="h-32" {...field} value={field.value as string} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Itinerary */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Itinerary</CardTitle>
                                <Button type="button" variant="outline" size="sm" onClick={() => append({ title: "", description: "" })}>
                                    <Plus size={16} className="mr-2" /> Add Step
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="relative flex gap-6 p-4 rounded-xl border border-gray-100 bg-gray-50/50 group">
                                        <div className="flex flex-col items-center gap-2 pt-2">
                                            <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-bold text-sm">{index + 1}</div>
                                            <div className="w-px h-full bg-gray-200 group-last:hidden"></div>
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <FormField
                                                control={form.control} name={`itinerary.${index}.title`}
                                                render={({ field }) => (
                                                    <FormItem><FormControl><Input placeholder="Step Title" className="font-semibold bg-white" {...field} /></FormControl></FormItem>
                                                )}
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="md:col-span-2">
                                                    <FormField
                                                        control={form.control} name={`itinerary.${index}.description`}
                                                        render={({ field }) => (
                                                            <FormItem><FormControl><Textarea placeholder="Description" className="bg-white" {...field} /></FormControl></FormItem>
                                                        )}
                                                    />
                                                </div>

                                            </div>
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={() => remove(index)}><Trash2 size={16} /></Button>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* CỘT PHẢI: SETTINGS */}
                    <div className="space-y-8">

                        {/* 👇 CARD STATUS: CHỈ CÓ Ở TRANG UPDATE */}
                        <Card className="border-l-4 border-l-terracotta">
                            <CardHeader><CardTitle>Status</CardTitle></CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control} name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    <SelectItem value={TourStatus.DRAFT}>Draft</SelectItem>
                                                    <SelectItem value={TourStatus.PUBLISHED}>Published</SelectItem>
                                                    <SelectItem value={TourStatus.HIDDEN}>Hidden</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>
                                                Current status of the tour.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Pricing & Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control} name="basePrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price ({form.getValues('currency')})</FormLabel>
                                            <FormControl><Input type="number" {...field} value={field.value as number} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control} name="durationHours"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Duration (Hours)</FormLabel>
                                            <FormControl><Input type="number" {...field} value={field.value as number} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control} name="meetingPoint"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Meeting Point</FormLabel>
                                            <FormControl><Input {...field} value={field.value as string} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control} name="isFree"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 bg-gray-50/50 mt-4">
                                            <FormLabel>Free Tour</FormLabel>
                                            <FormControl><Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader><CardTitle>Accessibility</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control} name="pickupAvailable"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 bg-gray-50/50">
                                            <FormLabel>Pickup</FormLabel>
                                            <FormControl><Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control} name="wheelchairAccessible"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 bg-gray-50/50">
                                            <FormLabel>Wheelchair</FormLabel>
                                            <FormControl><Checkbox checked={field.value as boolean} onCheckedChange={field.onChange} /></FormControl>
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </Form>
    );
};