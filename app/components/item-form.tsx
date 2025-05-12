"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ItemFormProps {
  item?: {
    id: number;
    title: string;
    description: string | null;
  };
  closeModal: () => void;
}

export function ItemForm({ item, closeModal }: ItemFormProps) {
  const isEditMode = !!item;
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: item?.title || "",
    description: item?.description || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isEditMode ? `/api/items/${item.id}` : "/api/items";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save item");
      }

      toast[isEditMode ? "success" : "success"](
        isEditMode ? "Item updated" : "Item created",
        {
          description: isEditMode
            ? "Your item has been updated successfully."
            : "Your item has been created successfully.",
          position: "top-right",
          duration: 3000,
        }
      );

      router.refresh();
     closeModal();
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Error", {
        description: "Failed to save item. Please try again.",
        position: "top-right",
        duration: 3000,});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Item" : "Create New Item"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {closeModal && (
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : isEditMode ? "Update" : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
