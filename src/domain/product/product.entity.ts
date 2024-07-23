import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    category: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    brand: string;

    @Column({ array: true, type: 'varchar', nullable: false })
    imageUrls: [string];

    @Column({ type: 'int', nullable: false, default: 0 })
    stockQuantity: number;

    @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
    ratings: number;

    @Column({ type: 'int', default: 0 })
    numReviews: number;

    @CreateDateColumn()
    createdAt: Date;
}
